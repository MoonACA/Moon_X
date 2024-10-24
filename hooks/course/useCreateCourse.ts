import { useMutation } from "@tanstack/react-query";
import { Course, createCourse as createCourseApi } from "@/services/apiCourses";
import { createCourse as createCourseConc } from "@/services/moonXContract";
import { uploadToIpfs } from "@/services/ipfs";
import { useWriteContract } from "wagmi";
import { Dispatch, SetStateAction } from "react";

export function useCreateCourse(
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>
) {
  const { isError, isPending, isSuccess, error, writeContract } =
    useWriteContract();

  const {
    isPending: isCreating,
    mutate: createCourse,
    data: createdCourse,
  } = useMutation({
    mutationFn: ({
      newCourse,
      videoName,
    }: {
      newCourse: Course;
      videoName: string;
    }) => createCourseApi(newCourse, videoName),

    onSuccess: async (data) => {
      const ipfsHash = await uploadToIpfs(data);
      const uri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setOpenUploadModal(false);
      await createCourseConc(writeContract, { metadataUri: uri });
      console.log("Course created successfully", data);
    },

    onError: (error) => {
      setOpenUploadModal(false);
      console.log(error.message);
    },
  });

  return {
    isCreating,
    isPending,
    isError,
    isSuccess,
    error,
    createCourse,
    createdCourse,
  };
}
