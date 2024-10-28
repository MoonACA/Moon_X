"use client";
import React, { useState } from "react";
import Image from "next/image";
import CourseDialog from "./ModelBox";

type CardProps = {
  image: string;
  category: string;
  title: string;
  registeredUsers: string;
  buttonLabel: string;
};

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  registeredUsers,
  buttonLabel,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          <p className="text-white">Registered Users</p>
          <p className="text-red-500 text-xs rounded-md bg-white px-2 py-1 uppercase">
            {registeredUsers}
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

const MyCoursesTab: React.FC = () => {
  const courses = [
    {
      image: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction To Blockchain Technology",
      registeredUsers: "100",
      buttonLabel: "Edit",
    }, // ROUTE THE USER COURSES FROM THE DB HERE
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-[1rem]">
      {courses.map((course, index) => (
        <Card
          key={index}
          image={course.image}
          category={course.category}
          title={course.title}
          registeredUsers={course.registeredUsers}
          buttonLabel={course.buttonLabel}
        />
      ))}
    </div>
  );
};

export default MyCoursesTab;
