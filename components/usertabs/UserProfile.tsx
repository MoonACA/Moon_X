"use client";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import ProgressStreakTab from "@/components/usertabs/Progress";
import ProfileCard from "@/components/usertabs/Profilecard";
import MyCoursesTab from "@/components/usertabs/MyCourses";
import { User } from "@/services/apiUsers";
import { truncateAddr } from "@/utils/helpers";
import { Course } from "@/services/apiCourses";

export default function UserProfile({
  params,
  user,
  enrolledCourses,
  myCourses,
}: {
  params: { walletAddress: string };
  user: User;
  enrolledCourses: Course[];
  myCourses: Course[];
}) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
    {
      id: 2,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
    {
      id: 3,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
    {
      id: 4,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
    {
      id: 5,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
    {
      id: 6,
      message:
        'New Course Alert: A new course you may like "Web3 Basics" is available now on the course page.',
      time: "01:50pm",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };
  const [activeTab, setActiveTab] = useState("Enrolled Courses");
  const renderContent = () => {
    switch (activeTab) {
      case "Enrolled Courses":
        return <ProgressStreakTab enrolledCourses={enrolledCourses} />;

      case "MyCourses":
        return <MyCoursesTab myCourses={myCourses} />;
      default:
        return null;
    }
  };
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    const textToCopy = user.walletAddress;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset after 2 seconds
      },
      () => {
        setCopySuccess("Failed to copy");
      }
    );
  };
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className=" w-[80vw] mx-auto max-sm:w-[90vw]">
        <div>
          {/* card */}
          <div className="bg-[#192A41]  border rounded-xl border-white">
            <div className="p-[1rem] sm:p-[2rem]">
              {/* for menu */}
              <div className="flex items-center justify-between mb-3 sm:mb-7 ">
                <div className="flex gap-4">
                  <Avatar
                    alt={user.displayName || ""}
                    src={
                      String(user.profilePicture) ||
                      "/static/images/avatar/1.jpg"
                    }
                    sx={{
                      width: { xs: 40, sm: 56 }, // 40px width for mobile, 56px for larger screens
                      height: { xs: 40, sm: 56 }, // 40px height for mobile, 56px for larger screens
                      border: "2px solid white", // 2px white border
                    }}
                  />
                  <div className="mt-1">
                    <p className="text-white text-sm md:text-lg">
                      {user.displayName || truncateAddr(user.walletAddress)}
                    </p>
                    <p className="text-white md:text-sm text-xs flex items-center gap-2">
                      <span>{truncateAddr(user.walletAddress)}</span>
                      <span
                        className="inline-flex mr-1"
                        onClick={handleCopy}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <IoCopy
                          style={{
                            color: "transparent", // Makes the inside of the icon transparent
                            stroke: "white", // Changes the outline color to white
                            strokeWidth: "30",
                          }}
                        />{" "}
                      </span>
                      {copySuccess && (
                        <span className="ml-2">{copySuccess}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <Link href={`/settings/${params.walletAddress}`}>
                    <button className="py-2 px-2 text-sm md:text-base md:py-3 md:px-3 text-white border border-1 border-white rounded-lg">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
              {/* for tab */}
              <div className=" ">
                <div className="flex items-center gap-1 justify-between">
                  <button
                    onClick={() => setActiveTab("Enrolled Courses")}
                    className={`w-1/2 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500 ${
                      activeTab === "Enrolled Courses"
                        ? "bg-[#FFEECB] font-semibold text-black"
                        : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                    }`}
                  >
                    Enrolled Courses
                  </button>

                  <button
                    onClick={() => setActiveTab("MyCourses")}
                    className={`w-1/2 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500 ${
                      activeTab === "MyCourses"
                        ? "bg-[#FFEECB] font-semibold text-black"
                        : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                    }`}
                  >
                    My Courses
                  </button>
                </div>
              </div>
              <hr className="bg-white h-[2px] md:-ml-7 md:-mr-7 mt-1 mb-3 sm:mb-7" />
              <ProfileCard />
            </div>
            <div className="mt-4">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
