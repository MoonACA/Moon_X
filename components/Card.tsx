"use client";

import { useEnrolledCourses } from "@/hooks/useEnrolledCourses";
import { updateEnrollCoursesAction } from "@/services/actions";
import { Course } from "@/services/apiCourses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import Loader from "./Loader";
import { toast } from "react-toastify";
import CardSkeleton from "./CardSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

const Card = ({ course }: { course: Course }) => {
  const { id, title, thumbnail, description } = course;

  const [isEnrolling, setIsEnrolling] = useState(false);

  const { address } = useAccount();

  const { enrolledCourses, isLoading } = useEnrolledCourses();
  const router = useRouter();
  const queryClient = useQueryClient();

  const enrolled = enrolledCourses?.includes(id);

  async function handleEnroll() {
    if (!address) return toast.error("Please connect your wallet");
    setIsEnrolling(true);
    try {
      await updateEnrollCoursesAction(address, String(id));
      await queryClient.invalidateQueries();
      router.push(`courses/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEnrolling(false);
    }
  }

  function openCourse() {
    router.push(`courses/${id}`);
  }
  if (isLoading) return <CardSkeleton />;
  return (
    <div>
      <div className=" bg-[#192A41] border rounded-xl border-[#FFFFFF] p-[1rem] grid gap-2">
        <div onClick={enrolled ? openCourse : handleEnroll}>
          <div className=" relative w-full h-[10rem] mx-auto z-[0] mb-[0.5rem]">
            <Image
              src={String(thumbnail)}
              layout="fill"
              objectFit="cover"
              alt=""
              className=" rounded-t-xl"
            />
          </div>
          <h3 className=" text-[1rem] text-[#FFFFFF] font-medium h-[3rem]">
            {title}
          </h3>
          <p className=" text-[#aaaaaa] text-[12px]">{description}</p>
          <button
            className="w-full mt-4 flex transition ease-in-out hover:duration-300 justify-center hover:opacity-80 items-center cursor-pointer py-1 font-semibold bg-[#FFEEE8] text-[#FF6636] text-[14px] leading-[40px] disabled:bg-gray-400 disabled:text-white"
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              <ClipLoader color="#ff6636" />
            ) : enrolled ? (
              "Open course"
            ) : (
              "Enroll course"
            )}
          </button>
          <div className=" flex justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
