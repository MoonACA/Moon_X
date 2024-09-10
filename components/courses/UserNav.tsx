'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/assets/BrandLogo.png';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
const UserNav = () => {
  const router = useRouter();
  return (
    /*     <header className="sticky top-[2rem] flex w-[80vw] shadow-glow justify-between text-white mx-auto bg-[#192A41] border border-white left-0 right-0 p-[1rem] rounded-full items-center  z-50 backdrop-blur-sm cursor-pointer">
      <div onClick={() => router.push('/')}>
        <Image
          src={logo}
          width={100}
          height={100}
          alt="logo"
          objectFit="contain"
        />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="md:flex w-[30rem] border border-white bg-transparent rounded-lg p-[0.3rem] hidden"
      />

      <div className="">
        <p className=" bg-[#021128] rounded-lg p-[0.3rem] text-sm">
          0xE....3412
        </p>
      </div>

      <div className="">
        <p className=" text-sm ">0.00123 MAND</p>
      </div>
    </header> */
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2  mx-auto shadow-glow  border border-white rounded-full bg-[#192A41]">
          <div className="flex px-6 items-center justify-between text-white">
            <div onClick={() => router.push('/')}>
              <Image
                src={logo}
                width={100}
                height={100}
                alt="logo"
                objectFit="contain"
              />
            </div>
            <input
              type="text"
              placeholder="Search here...."
              className="md:flex w-[30rem] border border-white bg-transparent rounded-lg p-[0.3rem] hidden"
            />
            <div className="flex">
              <Avatar>H</Avatar>
              <div className="inline-flex mt-1">
                <IoMdArrowDropdown style={{ width: 30, height: 30 }} />
              </div>
            </div>
            <div className="bg-[#021128] px-2 flex">
              <p className=" bg-[#021128] rounded-lg p-[0.3rem] text-sm">
                0xE....3412
              </p>
              <div className="inline-flex mt-[6px]">
                <IoCopy
                  style={{
                    color: 'transparent', // Makes the inside of the icon transparent
                    stroke: 'white', // Changes the outline color to white
                    strokeWidth: '30',
                  }}
                />
              </div>
            </div>

            <div className="">
              <p className=" text-sm ">0.00123 MAND</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNav;
