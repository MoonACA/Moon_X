"use client";

import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { BiMedal } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();

  const navData = [
    {
      link: "/courses",
      text: "Courses",
      icon: <IoBookOutline className="text-xl" />,
    },
    {
      link: "/userprofile",
      text: "Profile",
      icon: <IoMdTrendingUp className="text-xl" />,
    },
    {
      link: "/reward",
      text: "Rewards",
      icon: <BiMedal className="text-xl" />,
    },
    {
      link: "/swap",
      text: "Swap",
      icon: <BiMedal className="text-xl" />,
    },
    {
      link: "/settings",
      text: "Setting",
      icon: <BsDatabase className="text-xl" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-400 flex justify-around items-center p-1 md:hidden z-50">
      {navData.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className={`flex flex-col items-center justify-center w-full py-1 transition-all duration-300 ease-in-out ${
            item.link === pathname
              ? "text-blue-400 transform -translate-y-1"
              : "hover:text-gray-200"
          }`}
        >
          <div
            className={`mb-1 ${
              item.link === pathname
                ? "bg-[#FFEECB] text-gray-900"
                : "bg-transparent"
            } rounded-full p-1 transition-all duration-300 ease-in-out`}
          >
            {item.icon}
          </div>
          <p className="text-xs font-medium">{item.text}</p>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;
