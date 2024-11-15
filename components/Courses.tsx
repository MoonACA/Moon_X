import React, { Suspense } from "react";
import CourseList from "./CourseList";
import Loader from "./Loader";

const Courses = () => {
  return (
    <div className=" ">
      <div className=" text-white mb-[2rem]">
        <h1 className=" text-[2rem] font-bold mb-[0.5rem] cursor-pointer">
          Master the Future of the Internet with Web3 Tools
        </h1>
        <p className=" text-sm w-[30vw]">
          Comprehensive Courses on Blockchain, Smart Contracts, and Emerging
          Technologies
        </p>
      </div>

      <h1 className="text-[2rem] text-[#fff] font-bold  mb-[2rem]">Courses</h1>

      <Suspense fallback={<Loader />}>
        <CourseList />
      </Suspense>
    </div>
  );
};

export default Courses;
