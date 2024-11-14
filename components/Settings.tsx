"use client";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { IoCopy } from "react-icons/io5";
//TO ADD THE NAME AND WALLET ADDRESS

import React from "react";

import ProfileSettings from "@/components/usertabs/Settings";
import { User } from "@/services/apiUsers";
import { useAccount } from "wagmi";

export default function Settings({ user }: { user: User }) {
  const [copySuccess, setCopySuccess] = useState("");

  const { address } = useAccount();

  const handleCopy = () => {
    const textToCopy = "000x1234567890";
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
  const [activeTab, setActiveTab] = useState("Settings");
  const renderContent = () => {
    switch (activeTab) {
      case "Settings":
        return <ProfileSettings user={user} />;

      default:
        return null;
    }
  };
  if (!address) throw new Error("Please connect your wallet address");
  return (
    <div className="bg-[#00122C]  py-[10rem] ">
      <div className=" w-[80vw] mx-auto max-sm:w-[90vw]">
        {/* card */}
        <div className="bg-[#192A41] border rounded-xl border-white">
          <div className="p-[1rem] sm:p-[2rem]">
            {/* for menu */}
            <div className="flex items-center justify-between mb-3 sm:mb-5 ">
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
                  <p className="text-white text-sm md:text-lg">{"name"}</p>
                  <p className="text-white md:text-sm text-xs gap-2">
                    {1910}{" "}
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
                        }} // ADD THE NAME AND WALLET ADDRESS
                      />{" "}
                    </span>
                    {copySuccess && <span className="ml-2">{copySuccess}</span>}
                  </p>
                </div>
              </div>
            </div>
            {/* tab */}
            <div className="p-[1rem] flex items-center gap-1 justify-center">
              <button
                onClick={() => setActiveTab("Settings")}
                className={`w-full h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500 ${
                  activeTab === "Profile"
                    ? "bg-[#FFEECB] font-semibold text-black"
                    : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                }`}
              >
                Settings
              </button>
            </div>
            <hr className="bg-white h-[2px] md:-ml-7 md:-mr-7" />
          </div>
          {/*  */}
          <div className="bg-[#192A41]">
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
