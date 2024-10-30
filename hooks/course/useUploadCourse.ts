import { Dispatch, SetStateAction, useEffect } from "react";
import { useUppyEvent, useUppyState } from "@uppy/react";
import uppy from "@/services/uppy";
import useDeleteCourse from "./useDeleteCourse";
import { Course } from "@/services/apiCourses";

function useUploadCourse(
  createdCourse: Course | undefined,
  videoFile: File | undefined,
  setVideoName: Dispatch<SetStateAction<string>>,
  setVideoFile: Dispatch<SetStateAction<File | undefined>>
) {
  const errorUploading = useUppyState(uppy, (state) => state.error);
  const [files] = useUppyEvent(uppy, "file-added");
  const [result] = useUppyEvent(uppy, "complete");
  const { deleteCourse } = useDeleteCourse();

  useEffect(() => {
    if (!videoFile) return;
    uppy.clear();
    uppy.addFile(videoFile);
  }, [videoFile]);

  useEffect(() => {
    const singleFile = files[0];
    if (!singleFile) return console.log("No uploads");
    const videoName = `${Math.random()}-${singleFile.name}`;
    setVideoName(videoName);
    const supabaseMetadata = {
      bucketName: "videos",
      objectName: videoName,
      name: videoName,
      contentType: singleFile.type,
    };
    singleFile.meta = {
      ...singleFile.meta,
      ...supabaseMetadata,
    };
    console.log(singleFile);
  }, [files]);

  useEffect(() => {
    if (!createdCourse) return;
    if (errorUploading) {
      console.log(errorUploading);
      deleteCourse(createdCourse.id!);
    }
  }, [createdCourse, errorUploading, deleteCourse]);

  useEffect(() => {
    uppy.on("upload-success", () => {
      uppy.resetProgress();
      setVideoFile(undefined);
    });
  }, [setVideoFile]);
}

export { useUploadCourse };
