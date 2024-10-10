import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";

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
}

const Card: React.FC<CourseType> = ({ course }) => {
  return (
    <div>
      <div className=" bg-[#192A41] border rounded-xl border-[#FFFFFF] p-[1rem] grid gap-2">
        <Link href={`courses/${course?.id.toLocaleString()}`}>
          <div className=" relative w-full h-[10rem] mx-auto z-[0] mb-[0.5rem]">
            <Image
              src={course?.thumbnail}
              // width={0}
              // height={0}
              layout="fill"
              objectFit="cover"
              alt=""
              className=" rounded-t-xl"
            />
          </div>
          {/* <p className="  text-[0.7rem] font-medium uppercase text-[#342F98]  max-lg:text-[0.6rem] inline">
            <span className=" bg-[#EBEBFF] rounded-md py-[0.1rem] px-[0.3rem]">
              {course?.category}
            </span>
          </p> */}

          <h3 className=" text-[1rem] text-[#FFFFFF] font-medium h-[3rem]">
            {course?.title}
          </h3>

          {/* <div className=" flex justify-between items-center">
            <p className=" text-[#FFFFFF] font-medium text-[0.8rem]">Reward</p>
            <p className=" text-[#FF6636] bg-[#FFF2E5] rounded-md py-[0.1rem] px-[0.3rem] font-medium text-[0.7rem]">
              {course?.reward} MANO
            </p>
          </div> */}
          <p className=" text-[#aaaaaa] text-[12px]">{course?.description}</p>
          <div className=" flex justify-between items-center">
            {/* <p className=" text-[#aaaaaa] flex items-center gap-2">
              <FaStar className=" text-[#FD8E1F]" />
              {course?.rating}
            </p> */}

            {/* <div className=" text-[#fff] flex items-center gap-2">
              <LuUser2 />
              <p className="">
                {course?.viewers.toLocaleString()}{' '}
                <span className=" text-[#aaaaaa]">viewers</span>
              </p>
            </div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
