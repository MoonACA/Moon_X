"use client";

import React from "react";
import Card from "./Card";
import { useCourses } from "@/hooks/course/useCourses";

const Courses = () => {
  const { courses, isLoading, error } = useCourses();

  return (
    <div className=" ">
      <div className=" text-white mb-[2rem]">
        <h1 className=" text-[2rem] font-bold mb-[0.5rem] cursor-pointer">
          Master the Future of the Internet with Web3
        </h1>
        <p className=" text-sm w-[30vw]">
          Comprehensive Courses on Blockchain, Smart Contracts, and
          Decentralized Applications
        </p>
      </div>

      <h1 className="text-[2rem] text-[#fff] font-bold  mb-[2rem]">Courses</h1>
      <div className=" grid grid-cols-4 mx-auto gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
        {courses &&
          courses.map((course, index) => <Card course={course} key={index} />)}
      </div>
    </div>
  );
};

export default Courses;
