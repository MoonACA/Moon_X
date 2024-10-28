"use client";

import wallet from "@/public/assets/Wallet.png";
import Cupstar from "@/public/assets/CupStar.png";
import Note from "@/public/assets/Notebook.png";
import Vector from "@/public/assets/Vector.png";
import Image from "next/image";

import React from "react";

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-between gap-1  ">
      {/* small card */}
      <div className="bg-white md:p-[12px] p-[6px] flex gap-1 md:gap-4 rounded-md">
        <div className="">
          <Image
            src={wallet}
            alt="wallet"
            className="border bg-slate-100 md:w-12 w-8  md:h-12 h-8 md:py-2 py-1 md:px-2 px-1"
          />
        </div>
        <div className="md:w-32 w-8 ">
          <p className="font-medium md:font-semibold  text-xs md:text-base">
            124 Mand
          </p>
          <p className="mt-1 text-[10px] md:text-xs font-extralight md:font-light">
            124 Moonx
          </p>
        </div>
      </div>
      {/* small card */}
      <div className="bg-white md:p-[12px] p-[6px]  flex gap-1 md:gap-4 rounded-md">
        <div className="">
          <Image
            src={Vector}
            alt="Vector"
            className="border bg-blue-100 md:w-12 w-8  md:h-12 h-8 md:py-2 py-1 md:px-2 px-1"
          />
        </div>
        <div className="md:w-32 w-8 ">
          <p className="font-medium md:font-semibold  text-xs md:text-base">
            Coming Soon !{" "}
          </p>
          <p className="mt-1 text-[10px] md:text-xs font-extralight md:font-light">
            Daily Streak
          </p>
        </div>
      </div>
      <div className="bg-white md:p-[12px] p-[6px]  flex gap-1 md:gap-4 rounded-md">
        <div className="">
          <Image
            src={Note}
            alt="Book"
            className="border bg-green-100 md:w-12 w-8  md:h-12 h-8 md:py-2 py-1 md:px-2 px-1"
          />
        </div>
        <div className="md:w-32 w-8">
          <p className="font-medium md:font-semibold  text-xs md:text-base">
            3
          </p>
          <p className="mt-1 text-[10px] md:text-xs font-extralight md:font-light">
            Courses
          </p>
        </div>
      </div>
      <div className="bg-white md:p-[12px] p-[6px]  flex gap-1 md:gap-4 rounded-md">
        <div className="">
          <Image
            src={Cupstar}
            alt="Cup"
            className="border bg-yellow-100 md:w-12 w-8  md:h-12 h-8 md:py-2 py-1 md:px-2 px-1"
          />
        </div>
        <div className="md:w-32 w-8">
          <p className="font-medium md:font-semibold text-xs md:text-base">
            Coming soon
          </p>
          <p className="mt-1 text-[10px] md:text-xs font-extralight md:font-light">
            Rank
          </p>
        </div>
      </div>
    </div>
  );
}
