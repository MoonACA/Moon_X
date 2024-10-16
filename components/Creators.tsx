"use client";

import React, { useEffect, useState } from "react";
import one from "@/public/assets/creator1.png";
import two from "@/public/assets/creator2.png";
import Image from "next/image";
import { getUserById, User } from "@/services/apiUsers";

type CreatorType = {
  creatorId: number;
};

const Creators = ({ creatorId }: CreatorType) => {
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    async function retrieveUser() {
      if (!creatorId) return;
      try {
        const userData = await getUserById(creatorId);
        setUserData(userData);
      } catch (err) {
        console.log(err);
      }
    }

    retrieveUser();
  }, [creatorId]);

  function truncateAddr() {
    if (!userData) return;
    if (!userData.walletAddress) return;
    const len = userData.walletAddress.length;
    const firstPart = userData.walletAddress.slice(0, 5);
    const lastPart = userData.walletAddress.slice(len - 5, len);
    return `${firstPart}...${lastPart}`;
  }
  return (
    <div>
      <div className=" mt-[1rem] flex items-center max-md:flex-col max-md:items-start">
        <div className=" flex items-center">
          <div className=" rounded-full border border-white w-[3rem] h-[3rem] relative">
            <Image
              src={one}
              alt=""
              layout="fill"
              objectFit="cover"
              className=" rounded-full"
            />
          </div>
          {/* <div className=" rounded-full border border-white w-[3rem] h-[3rem] relative left-[-1.5rem]">
            <Image
              src={two}
              alt=""
              layout="fill"
              objectFit="cover"
              className=" rounded-full"
            />
          </div> */}
        </div>

        <div className=" text-[#aaaaaa] text-sm font-medium ml-2">
          <p className="">Created by:</p>
          <ul className=" flex items-center gap-10">
            <li className="">
              {userData?.fullName ? userData.fullName : truncateAddr()}
            </li>
            {/* <li className=" list-disc">Faith Chike</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Creators;
