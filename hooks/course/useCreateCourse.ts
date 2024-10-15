import { useMutation } from "@tanstack/react-query";
import { createCourse as createCourseApi } from "@/services/apiCourses";
import { createCourse as createCourseConc } from "@/services/moonXContract";
import { uploadToIpfs } from "@/services/ipfs";
import { useWriteContract } from "wagmi";

export function useCreateCourse() {
  const { isError, isPending, isSuccess, writeContract } = useWriteContract();

  const { isPending: isCreating, mutate: createCourse } = useMutation({
    mutationFn: createCourseApi,

    onSuccess: async (data) => {
      const ipfsHash = await uploadToIpfs(data);
      const uri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      await createCourseConc(writeContract, { metadataUri: uri });
      console.log("Course created successfully", data);
    },

    onError: (error) => console.log(error.message),
  });

  return { isCreating, createCourse };
}
