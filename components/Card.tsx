import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseType {
  course: {
    id: number;
    thumbnail: string;
    category: string;
    title: string;
    description: string;
    reward: number;
    rating: number;
    viewers: number;
  };
  enroll?: boolean;
}

const Card: React.FC<CourseType> = ({ course, enroll }) => {
  return (
    <div>
      <div className=' bg-[#192A41] border rounded-xl border-[#FFFFFF] p-[1rem] grid gap-2'>
        <Link href={`courses/${course?.id.toLocaleString()}`}>
          <div className=' relative w-full h-[10rem] mx-auto z-[0] mb-[0.5rem]'>
            <Image
              src={course?.thumbnail}
              layout='fill'
              objectFit='cover'
              alt=''
              className=' rounded-t-xl'
            />
          </div>

          <h3 className=' text-[1rem] text-[#FFFFFF] font-medium h-[3rem]'>
            {course?.title}
          </h3>

          <p className=' text-[#aaaaaa] text-[12px]'>{course?.description}</p>
          {enroll && (
            <button className='w-full mt-4 flex transition ease-in-out hover:duration-300 justify-center hover:opacity-80 items-center cursor-pointer py-1 font-semibold bg-[#FFEEE8] text-[#FF6636] text-[14px] leading-[40px]'>
              Enroll Course
            </button>
          )}
          <div className=' flex justify-between items-center'></div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
