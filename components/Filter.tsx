"use client";

import { useClipboard } from "@/hooks/useClipBoard";
import { Course } from "@/services/apiCourses";
import { truncateAddr } from "@/utils/helpers";
import { Avatar } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { useAccount } from "wagmi";

function Filter({ courses = [] }: { courses: Course[] }) {
  const [copySuccess, setCopySuccess] = useState("");

  const searchParams = useSearchParams();

  const activeStatus = searchParams.get("status");

  const [activeTab, setActiveTab] = useState(
    !activeStatus ? "all" : activeStatus
  );

  const pathName = usePathname();
  const router = useRouter();

  const { address } = useAccount();
  const { copyToClipboard, copied: hasCopiedKey } = useClipboard();

  useEffect(() => {
    if (!activeStatus) return;
    setActiveTab(activeStatus);
  }, [activeStatus]);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    router.replace(pathName + "?" + params.toString(), { scroll: false });
    setActiveTab(value);
  };

  const handleCopy = () => {
    copyToClipboard(`${address}`);
  };

  return (
    <>
      {/* for menu */}
      <div className="flex items-center justify-between mb-3 sm:mb-7 ">
        <div className="flex items-center justify-between mb-3 sm:mb-7 ">
          <div className="flex gap-4">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{
                width: { xs: 40, sm: 56 }, // 40px width for mobile, 56px for larger screens
                height: { xs: 40, sm: 56 }, // 40px height for mobile, 56px for larger screens
                border: "2px solid white", // 2px white border
              }}
            />
            <div className="mt-1">
              <p className="text-white text-sm md:text-lg">Admin</p>
              <p className="text-white md:text-sm text-xs gap-2">
                {truncateAddr(address)}
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
                {copySuccess && <span className="ml-2">{copySuccess}</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* for tab */}
      <div className="flex items-center justify-between gap-2 md:gap-0">
        <div>
          <button
            onClick={() => {
              router.replace(pathName, { scroll: false });
              setActiveTab("all");
            }}
            className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500  ${
              activeTab === "all"
                ? "bg-[#FFEECB] font-semibold text-black"
                : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
            }`}
          >
            All Courses
            {!activeStatus && (
              <span
                className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                  activeTab === "all"
                    ? "bg-[#17315C] text-white "
                    : "bg-white text-[#17315C]"
                }`}
              >
                {courses.length}
              </span>
            )}
          </button>
        </div>
        <div>
          <button
            onClick={() => createQueryString("status", "active")}
            className={`w-24 md:w-64 h-12 md:h-16 text-sm  md:text-base focus:text-black  rounded-md flex items-center justify-center transition duration-500  ${
              activeTab === "active"
                ? "bg-[#FFEECB] font-semibold text-black"
                : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
            }`}
          >
            Active Courses
            {activeStatus == "active" && (
              <span
                className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                  activeTab === "active"
                    ? "bg-[#17315C] text-white "
                    : "bg-white text-[#17315C]"
                }`}
              >
                {courses.length}
              </span>
            )}
          </button>
        </div>
        <div>
          <button
            onClick={() => createQueryString("status", "pending")}
            className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base    focus:text-black rounded-md flex items-center justify-center transition duration-500  ${
              activeTab == "pending"
                ? "bg-[#FFEECB] font-semibold text-black"
                : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
            }`}
          >
            Pending Courses
            {activeStatus == "pending" && (
              <span
                className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                  activeTab === "pending"
                    ? "bg-[#17315C] text-white "
                    : "bg-white text-[#17315C]"
                }`}
              >
                {courses.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
