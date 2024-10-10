"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import BreadCrumbs from "./BreadCrumbs";
import { BtnPrimaryWhite } from "./Btn";
import CourseTop from "./CourseTop";
import img from "@/public/assets/course.jpeg";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Creators from "./Creators";
import Rating from "./Rating";
import GoBack from "./GoBack";
import { useCourses } from "@/hooks/course/useCourses";
import DOMPurify from "dompurify";
const CourseDetails = () => {
  const { course: courseId } = useParams();
  const { courses, isLoading, error } = useCourses();
  const course = courses?.find((data) => data.id == Number(courseId));

  const safeLecture = DOMPurify.sanitize(course?.fullText);

  return (
    <div>
      <GoBack text="Course details" route="/courses" />
      <div className=" p-[1rem] border border-white rounded-2xl mt-[1rem] bg-[#192A41]">
        <BreadCrumbs text="Development" />

        <CourseTop text={course?.title} />

        <p className=" text-sm text-[#aaaaaa] max-sm:text-[0.8rem]">
          {course?.description}
        </p>

        <div className="flex justify-between items-center max-md:flex-col gap-3 max-md:items-start">
          <Creators creatorId={course?.creatorId} />
          <Rating />
        </div>

        <div className=" relative w-full h-[20rem] my-[1rem]">
          {/* <Image
            src={img}
            alt=""
            layout="fill"
            objectFit="cover"
            className=" rounded-2xl"
          /> */}

          <iframe
            src={course?.videoUrl}
            frameBorder={"0"}
            width={"100%"}
            height={"100%"}
          ></iframe>

          {/* <div className=" absolute top-[50%] bottom-[50%] left-[50%] mx-auto right-[50%] text-[#FF6636] text-2xl p-[0.5rem] bg-white w-[3rem] h-[3rem] rounded-full flex items-center justify-center cursor-pointer">
            <FaPlay />
          </div> */}
        </div>

        <h2 className=" text-xl text-white font-bold mb-[1rem]">Description</h2>
        <div
          className=" text-white text-sm max-md:text-[0.8rem]"
          dangerouslySetInnerHTML={{ __html: safeLecture }}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
