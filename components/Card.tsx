import { Course } from "@/services/apiCourses";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ course }: { course: Course }) => {
  const { id, title, thumbnail, approved, description } = course;
  return (
    <div>
      <div className=" bg-[#192A41] border rounded-xl border-[#FFFFFF] p-[1rem] grid gap-2">
        <Link href={`courses/${id}`}>
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
          {approved && (
            <button className="w-full mt-4 flex transition ease-in-out hover:duration-300 justify-center hover:opacity-80 items-center cursor-pointer py-1 font-semibold bg-[#FFEEE8] text-[#FF6636] text-[14px] leading-[40px]">
              Enroll Course
            </button>
          )}
          <div className=" flex justify-between items-center"></div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
