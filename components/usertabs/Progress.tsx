"use client";
import React, { useState } from "react";
import Image from "next/image";
import CourseDialog from "./ModelBox";
import { Course } from "@/services/apiCourses";
import { useRouter } from "next/navigation";

type CardProps = {
  id: number;
  image: string;
  category: string;
  title: string;
  reward: string;
  buttonLabel: string;
};

const Card: React.FC<CardProps> = ({
  id,
  image,
  category,
  title,
  reward,
  buttonLabel,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClickOpen = () => {
    router.push(`/courses/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="rounded-xl bg-[#192A41] border border-white">
      <div className="p-4 flex flex-col">
        <div className="rounded-xl overflow-hidden">
          <div className="relative h-64 w-full">
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-start">
          <p className="text-[#192A41] text-xs font-semibold rounded-md px-1 bg-white py-1 uppercase">
            {category}
          </p>
        </div>
        <h3 className="text-white mt-3 font-bold md:text-xl">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-white">Reward</p>
          <p className="text-red-500 text-xs rounded-md bg-white px-2 py-1 uppercase">
            {reward}
          </p>
        </div>
        <hr className="mt-2 bg-white h-[1px]" />
        <button
          className="text-red-500 bg-white py-3 px-3"
          onClick={handleClickOpen}
        >
          {buttonLabel}
        </button>

        <CourseDialog open={open} onClose={handleClose} />
      </div>
    </div>
  );
};

const ProgressStreakTab = ({
  enrolledCourses,
}: {
  enrolledCourses: Course[];
}) => {
  const courses = [
    {
      image: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction To Blockchain Technology",
      reward: "50 mand",
      buttonLabel: "Watch Course",
    }, // ROUTE THE ENROLLED COURSES FROM THE DB HERE
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-[1rem]">
      {enrolledCourses.map((course, index) => (
        <Card
          key={index}
          id={course.id}
          image={String(course.thumbnail)}
          category={course.category}
          title={course.title}
          reward={"50 mand"}
          buttonLabel={"Watch course"}
        />
      ))}
    </div>
  );
};

export default ProgressStreakTab;
//MAP ENROLLED COURSES HERE
