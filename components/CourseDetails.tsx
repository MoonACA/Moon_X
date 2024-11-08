"use client";

import { useParams } from "next/navigation";
import React from "react";
import BreadCrumbs from "./BreadCrumbs";
import CourseTop from "./CourseTop";
import Creators from "./Creators";
import Rating from "./Rating";
import GoBack from "./GoBack";
import { useCourses } from "@/hooks/course/useCourses";
import DOMPurify from "dompurify";

const CourseDetails = () => {
  const { course: courseId } = useParams();
  const { courses, isLoading, error } = useCourses();
  const course = courses?.find((data) => data.id == Number(courseId));

  if (!course) return null;

  const safeLecture = DOMPurify.sanitize(course.fullText);

  return (
    <div>
      <GoBack text="Course details" route="/courses" />
      <div className=" p-[1rem] border border-white rounded-2xl mt-[1rem] bg-[#192A41]">
        <BreadCrumbs text="Development" />

        <CourseTop text={course.title} />

        <p className=" text-sm text-[#aaaaaa] max-sm:text-[0.8rem]">
          {course.description}
        </p>

        <div className="flex justify-between items-center max-md:flex-col gap-3 max-md:items-start">
          <Creators creatorAddress={course.creatorAddress} />
          <Rating />
        </div>

        <div className=" relative w-full h-[20rem] my-[1rem]">
          <iframe
            src={String(course.videoUrl) || ""}
            frameBorder={"0"}
            width={"100%"}
            height={"100%"}
          ></iframe>
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
