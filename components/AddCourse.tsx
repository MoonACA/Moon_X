"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { BtnCancel, BtnSubmit } from "./Btn";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAccount } from "wagmi";
import { Course } from "@/services/apiCourses";
import { createGetUser, getUserByWalletAddress } from "@/services/apiUsers";
import { useCreateCourse } from "@/hooks/course/useCreateCourse";
import useDeleteCourse from "@/hooks/course/useDeleteCourse";
import { toast } from "react-toastify";
import { useUppyState } from "@uppy/react";
import uppy from "@/services/uppy";
import { useUploadCourse } from "@/hooks/course/useUploadCourse";
import { useUser } from "@/hooks/user/useUser";
import { useFileReader } from "@/hooks/useFileReader";
import Image from "next/image";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const AddCourse = () => {
  const [value, setValue] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const { address } = useAccount();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [videoName, setVideoName] = useState("");
  const totalProgress = useUppyState(uppy, (state) => state.totalProgress);

  useFileReader(thumbnailFile, setThumbnailPreview);

  const {
    isCreating,
    isPending: signing,
    isSuccess,
    isError,
    createCourse,
    createdCourse,
  } = useCreateCourse(setOpenUploadModal);

  const { deleteCourse } = useDeleteCourse();

  useUploadCourse(createdCourse, videoFile, setVideoName, setVideoFile);

  const { user } = useUser(address);

  useEffect(() => {
    if (signing || isCreating) return;
    if (isSuccess) {
      console.log("create course contract call successful");
      toast.success("create course contract call successful");
    }
    if (isError) {
      console.log("Created course", createdCourse, createdCourse?.id);
      toast.error("create course contract call unsuccessful");
      const id = createdCourse?.id;
      if (id) {
        deleteCourse(id);
      }
    }
  }, [isSuccess, isError, createdCourse, deleteCourse, signing, isCreating]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return toast.error("wallet not connected");
    if (!user) return toast.error("user not found");
    if (!thumbnailFile || !videoFile)
      return toast.error("add a thumb nail and the course video");
    setOpenUploadModal(true);
    const courseData: Course = {
      creatorAddress: address,
      title: courseTitle,
      fullText: value,
      description: courseDescription,
      thumbnail: thumbnailFile,
      videoUrl: videoFile,
    };
    createCourse({ newCourse: courseData, videoName });
  }

  return (
    <div className=" bg-[#192A41] p-[1rem] rounded-xl border border-white">
      <div className="">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <div className="w-full">
              <label htmlFor="title" className="block text-sm text-white mb-1">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Write course title"
                className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41] w-full md:w-[50%]"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="text-white block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41] w-full md:w-[50%] h-20"
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
          <div className=" mt-[1rem] mb-[4rem] flex flex-col gap-2">
            <label htmlFor="" className=" text-white text-sm">
              Course lecture note
            </label>
            <ReactQuill
              theme="snow"
              formats={["header", "font", "size", "bold", "italic", "color"]}
              value={value}
              onChange={setValue}
              style={{ color: "#fff", height: "10rem" }}
            />
          </div>

          <div className=" my-[1rem]">
            <label htmlFor="thumbnail" className=" flex flex-col gap-2">
              <p className=" text-sm text-white">Course Thumbnail</p>
              <div className=" flex items-end gap-5">
                <div>
                  {thumbnailPreview ? (
                    <Image
                      src={thumbnailPreview}
                      alt=""
                      width={50}
                      height={50}
                      className="w-[150px] h-[150px]"
                    />
                  ) : (
                    <FaRegImage
                      className="bg-[#F5F7FA] p-[2rem] text-[10rem]"
                      color="#B7BAC7"
                    />
                  )}
                </div>

                <div className=" w-[20rem]">
                  <p className=" text-[0.8rem] mb-[1rem] text-[#F5F7FA]">
                    Upload your course Thumbnail here. Important guidelines:
                    1200x800 pixels or 12:8 Ratio. Supported format: .jpg,
                    .jpeg, or .png
                  </p>
                  <div className=" flex gap-2 items-center text-[#FF6636] bg-[#FFEEE8] w-[10rem] justify-center py-[0.5rem] text-sm cursor-pointer">
                    Upload Image <MdOutlineFileUpload />
                  </div>
                </div>
              </div>
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              className=" hidden"
              onChange={(e) => setThumbnailFile(e.target.files?.[0])}
            />
          </div>

          <div className="flex gap-5 items-center max-md:flex-col max-md:gap-2">
            <div className=" my-[1rem] w-[25rem] max-md:w-full">
              <label htmlFor="notes" className=" flex flex-col gap-2">
                <p className=" text-sm text-white">Course Video</p>
                <div className=" bg-[#F5F7FA] p-[2rem] text-center">
                  <h3 className=" font-medium">Upload Video</h3>
                  <p className=" text-[#8C94A3] text-sm">
                    Drag an drop a file or{" "}
                    <span className=" text-[#4E5566] cursor-pointer hover:underline">
                      browse file
                    </span>
                  </p>
                  <p>{videoFile?.name}</p>
                </div>
              </label>
              <input
                type="file"
                name="notes"
                id="notes"
                accept="video/*"
                className=" hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0])}
              />
            </div>

            {/* <div className=" flex flex-col gap-2 w-[10rem] max-md:w-full">
              <p className="text-sm text-white">Set Quiz Questions</p>
              <div
                className=" bg-[#F5F7FA] p-[2rem] text-center cursor-pointer"
                onClick={() => setAddQuiz(true)}
              >
                <h3 className=" font-medium">Quiz</h3>
                <p className=" text-[#8C94A3] text-sm">Set Quiz</p>
              </div>
            </div> */}
          </div>

          <div className=" flex items-center justify-between mt-[1rem]">
            <BtnCancel text="Cancel" />
            {isCreating || openUploadModal ? (
              <div className="w-52 mb-5 rounded-lg text-white text-center ">
                <p className="text-sm z-50 ">Uploading...</p>
                {/* <div
                  className={`absolute transition-all ease-linear top-0 h-full w-[${totalProgress}%] bg-[#FF6636] rounded-lg`}
                ></div> */}
                <progress max={100} value={totalProgress} />
              </div>
            ) : (
              <BtnSubmit text={signing ? "Signing...." : "Submit for Review"} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
