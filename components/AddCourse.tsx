"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { BtnCancel, BtnSubmit } from "./Btn";
import QuizModal from "./QuizModal";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";
import ModuleModal from "./ModuleModal";
import { useAccount } from "wagmi";
import { Course } from "@/services/apiCourses";
import { getUserByWalletAddress } from "@/services/apiUsers";
import { useCreateCourse } from "@/hooks/course/useCreateCourse";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const AddCourse = () => {
  const [addQuiz, setAddQuiz] = useState(false);
  const [value, setValue] = useState("");
  const [isModuleAdd, setIsModuleAdd] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  // const [courseCategory, setCourseCategory] = useState("Blockchain");
  // const [courseTopic, setCourseTopic] = useState("Blockchain");
  // const [courseSubTitle, setCourseSubTitle] = useState("Blockchain");
  // const [courseDuration, setCourseDuration] = useState("30days");
  const [courseDescription, setCourseDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | string>();
  const [videoFile, setVideoFile] = useState<File | string>();

  const { address } = useAccount();

  const { isCreating, createCourse } = useCreateCourse();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address) return console.log("wallet not connected");
    const user = await getUserByWalletAddress(address);
    if (!user) return;
    if (!thumbnailFile || !videoFile)
      return console.log("add a thumb nail and the course video");
    const courseData: Course = {
      title: courseTitle,
      creatorId: user.id!,
      thumbnail: thumbnailFile,
      videoUrl: videoFile,
      description: courseDescription,
      fullText: value,
    };
    console.log(courseData);
    createCourse(courseData);
  }

  return (
    <div className=" bg-[#192A41] p-[1rem] rounded-xl border border-white">
      {addQuiz && <QuizModal addQuiz={addQuiz} setAddQuiz={setAddQuiz} />}

      {isModuleAdd && (
        <ModuleModal
          isModuleAdd={isModuleAdd}
          setIsModuleAdd={setIsModuleAdd}
        />
      )}

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
            {/* <div className=" flex flex-col gap-1">
              <label htmlFor="category" className=" text-sm text-white">
                Course Category
              </label>
              <select
                name="category"
                id="category"
                className=" p-[0.5rem] rounded-lg border-none"
                onChange={(e) => setCourseCategory(e.target.value)}
                value={courseCategory}
              >
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div> */}
            {/* <div className=" flex flex-col gap-1">
              <label htmlFor="topic" className=" text-sm text-white">
                Course Topic
              </label>
              <select
                name="topic"
                id="topic"
                className=" p-[0.5rem] rounded-lg border-none"
                onChange={(e) => setCourseTopic(e.target.value)}
                value={courseTopic}
              >
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div> */}
            {/* <div className=" flex flex-col gap-1">
              <label htmlFor="subtitle" className=" text-sm text-white">
                Subtitle (Optional)
              </label>
              <select
                name="subtitle"
                id="subtitle"
                className=" p-[0.5rem] rounded-lg border-none"
                onChange={(e) => setCourseSubTitle(e.target.value)}
                value={courseSubTitle}
              >
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div> */}
            {/* <div className=" flex flex-col gap-1">
              <label htmlFor="duration" className=" text-sm text-white">
                Course Duration
              </label>
              <select
                name="duration"
                id="duration"
                className=" p-[0.5rem] rounded-lg border-none"
                onChange={(e) => setCourseDuration(e.target.value)}
                value={courseDuration}
              >
                <option value="30days">30days</option>
                <option value="60days">60days</option>
                <option value="90days">90days</option>
              </select>
            </div> */}
          </div>

          {/* <div
            className=" cursor-pointer bg-[#FFEECB] p-[0.5rem] w-[8rem] mt-[1rem] rounded-lg text-sm flex items-center justify-center font-medium"
            onClick={() => setIsModuleAdd(true)}
          >
            Add Modules
          </div> */}
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

          {/* <div className=''>
						<EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
						<Toolbar editor={editor} content={content} />
					</div> */}

          <div className=" my-[1rem]">
            <label htmlFor="thumbnail" className=" flex flex-col gap-2">
              <p className=" text-sm text-white">Course Thumbnail</p>
              <div className=" flex items-end gap-5">
                <FaRegImage
                  className="bg-[#F5F7FA] p-[2rem] text-[10rem]"
                  color="#B7BAC7"
                />
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
                </div>
              </label>
              <input
                type="file"
                name="notes"
                id="notes"
                className=" hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0])}
              />
            </div>

            <div className=" flex flex-col gap-2 w-[10rem] max-md:w-full">
              <p className="text-sm text-white">Set Quiz Questions</p>
              <div
                className=" bg-[#F5F7FA] p-[2rem] text-center cursor-pointer"
                onClick={() => setAddQuiz(true)}
              >
                <h3 className=" font-medium">Quiz</h3>
                <p className=" text-[#8C94A3] text-sm">Set Quiz</p>
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-between mt-[1rem]">
            <BtnCancel text="Cancel" />
            <BtnSubmit text={isCreating ? "Loading..." : "Submit for Review"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
