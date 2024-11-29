"use client";
import { useContract } from "@/hooks/useContract";
import { useFileReader } from "@/hooks/useFileReader";
import { createCourseAction, deleteCourseAction } from "@/services/actions";
import { Course } from "@/services/apiCourses";
import { uploadToIpfs } from "@/services/ipfsAction";
import { writeToContract } from "@/services/moonXContract";
import { fileToBlob } from "@/utils/helpers";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAccount, useWriteContract } from "wagmi";
import { BtnCancel, BtnSubmit } from "./Btn";
import { s3UploadFile } from "@/services/s3Uploads";

type InputType = {
  title: string;
  description: string;
  notes: string;
  video: FileList;
  thumbnail: FileList;
};

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const AddCourse = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const [isCreating, setIsCreating] = useState(false);

  const [signing, setSigning] = useState(false);

  const [createdCourse, setCreatedCourse] = useState<Course>();

  const { address } = useAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>();

  const thumbnailFiles = watch("thumbnail");

  const videoFiles = watch("video");

  const thumbnailFile =
    thumbnailFiles?.length > 0 ? thumbnailFiles[0] : undefined;
  const videoFile = videoFiles?.length > 0 ? videoFiles[0] : undefined;

  useFileReader(thumbnailFile, setThumbnailPreview);

  const { writeContract, error: contractError, isSuccess } = useWriteContract();

  const { refetch, isError } = useContract("courseCount");

  useEffect(() => {
    if (isSuccess) setSigning(false);
  }, [isSuccess]);

  useEffect(() => {
    if (!createdCourse) return;
    if (!contractError) return;
    setSigning(false);
    // delete course when contract execution fails
    deleteCourseAction(String(createdCourse.id), address!);
  }, [contractError, createdCourse, address]);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    if (!address) return toast.error("wallet not connected");
    console.log(data);
    const resp = await refetch();
    const courseCount = resp.data;

    if (isError) return toast.error("Error creating course");
    setIsCreating(true);
    setCreatedCourse(undefined);
    const formData = new FormData();

    for (const i of Object.entries(data)) {
      if (typeof i[1] == "object") {
        const blob = (await fileToBlob(i[1][0])) as Blob;
        formData.set(i[0], blob, i[1][0].name);
      } else {
        formData.set(i[0], String(i[1]));
      }
    }

    formData.set("creatorAddress", address);
    formData.set("contractId", String(Number(courseCount) + 1));

    const videoName = `${Math.random()}-${data.video[0].name}`;

    try {
      const created = await createCourseAction(formData, videoName);
      setCreatedCourse(created);
      console.log({ created });
      setIsCreating(false);
      setSigning(true);
      await writeCourseToContract(created);
    } catch (error) {
      console.log(error);
      setIsCreating(false);
      setSigning(false);
    }
  };

  async function writeCourseToContract(createdCourse: Course) {
    try {
      const ipfsHash = await uploadToIpfs(JSON.stringify(createdCourse));
      const uri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      writeToContract(writeContract, {
        args: [uri],
        functionName: "createCourse",
        value: "0.75",
      });
    } catch (error) {
      await deleteCourseAction(
        String(createdCourse.id),
        createdCourse.creatorAddress
      );
      setSigning(false);
    }
  }

  return (
    <div className=" bg-[#192A41] p-[1rem] rounded-xl border border-white">
      <div className="">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="w-full">
              <label htmlFor="title" className="block text-sm text-white mb-1">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Write course title"
                className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41] w-full md:w-[50%]"
                {...register("title", { required: true })}
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="text-white block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41] w-full md:w-[50%] h-20"
              {...register("description", { required: true })}
            />
          </div>
          <div className=" mt-[1rem] mb-[4rem] flex flex-col gap-2">
            <label htmlFor="" className=" text-white text-sm">
              Course lecture note
            </label>
            {/* <ReactQuill
              theme="snow"
              formats={["header", "font", "size", "bold", "italic", "color"]}
              // value={value}
              // onChange={setValue}
              
              style={{ color: "#fff", height: "10rem" }}
            /> */}
            <textarea
              id="notes"
              className="px-3 py-2 text-sm text-white bg-transparent border-[1px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6636] focus:ring-offset-2 focus:ring-offset-[#192A41] w-full  h-40"
              {...register("notes", { required: true })}
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
              id="thumbnail"
              accept="image/*"
              className=" hidden"
              {...register("thumbnail", { required: true })}
            />
          </div>

          <div className="flex gap-5 items-center max-md:flex-col max-md:gap-2">
            <div className=" my-[1rem] w-[25rem] max-md:w-full">
              <label htmlFor="video" className=" flex flex-col gap-2">
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
                id="video"
                accept="video/*"
                className=" hidden"
                {...register("video", { required: true })}
              />
            </div>
          </div>

          <div className=" flex items-center justify-between mt-[1rem]">
            <BtnCancel text="Cancel" />
            {isCreating ? (
              <div className="w-52 mb-5 rounded-lg text-white text-center flex flex-col justify-center items-center ">
                <p className="text-sm z-50 ">Uploading...</p>
                {/* <div
                  className={`absolute transition-all ease-linear top-0 h-full w-[${totalProgress}%] bg-[#FF6636] rounded-lg`}
                ></div> */}
                <BarLoader color="#fff" />
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
