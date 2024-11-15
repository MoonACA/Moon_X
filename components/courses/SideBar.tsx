"use client";

import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { BiMedal } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const SideBar = () => {
  const pathname = usePathname();
  const { address } = useAccount();

  const navData = [
    {
      link: "/courses",
      text: "courses",
      icon: <IoBookOutline />,
    },
    {
      link: `/userprofile/${address}`,
      text: "Profile",
      icon: <IoMdTrendingUp />,
    },
    {
      link: "/reward",
      text: "Rewards",
      icon: <BiMedal />,
    },
    {
      link: "/swap",
      text: "Swap",
      icon: <BsDatabase />,
    },
    {
      link: `/settings/${address}`,
      text: "Settings",
      icon: <BsDatabase />,
    },
  ];

  return (
    <div className=" flex items-center h-[100vh] fixed left-0 max-md:hidden">
      <div className="  text-white flex flex-col justify-between h-[60vh] top-0">
        {navData.map((list, index) => (
          <Link href={list.link} className="" key={index}>
            <div
              className={` bg-[#cfcfcf3b] rounded-r-full h-[3rem] flex items-center justify-center text-xl`}
            >
              <div
                className={` ${
                  list.link === pathname && "bg-[#EE8A16]"
                } bg-[#d9d9d948] rounded-full h-[2rem] w-[2rem] flex items-center justify-center`}
              >
                {list.icon}
              </div>
            </div>
            <p className="">{list.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
