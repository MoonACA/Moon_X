/* 'use client';

import React from 'react';
import { IoBookOutline } from 'react-icons/io5';
import { IoMdTrendingUp } from 'react-icons/io';
import { BiMedal } from 'react-icons/bi';
import { BsDatabase } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavBar = () => {
  const pathname = usePathname();

  const navData = [
    {
      link: '/user/courses',
      text: 'Courses',
      icon: <IoBookOutline />,
    },
    {
      link: '/userprofile',
      text: 'Profile',
      icon: <IoMdTrendingUp />,
    },
    {
      link: '/reward',
      text: 'Rewards',
      icon: <BiMedal />,
    },
    {
      link: '/quiz',
      text: 'quiz',
      icon: <BsDatabase />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-between p-2 md:hidden">
      {navData.map((list, index) => (
        <Link
          href={list.link}
          key={index}
          className="flex flex-col items-center"
        >
          <div
            className={`${
              list.link === pathname ? 'bg-[#EE8A16]' : 'bg-[#d9d9d948]'
            } rounded-full h-[3rem] w-[3rem] flex items-center justify-center`}
          >
            {list.icon}
          </div>
          <p className="text-xs">{list.text}</p>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavBar; */
'use client';

import React from 'react';
import { IoBookOutline } from 'react-icons/io5';
import { IoMdTrendingUp } from 'react-icons/io';
import { BiMedal } from 'react-icons/bi';
import { BsDatabase } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNavBar = () => {
  const pathname = usePathname();

  const navData = [
    {
      link: '/courses',
      text: 'Courses',
      icon: <IoBookOutline className="text-xl" />,
    },
    {
      link: '/userprofile',
      text: 'Profile',
      icon: <IoMdTrendingUp className="text-xl" />,
    },
    {
      link: '/reward',
      text: 'Rewards',
      icon: <BiMedal className="text-xl" />,
    },
    {
      link: '/settings',
      text: 'Quiz',
      icon: <BsDatabase className="text-xl" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-400 flex justify-around items-center p-2 md:hidden z-50">
      {navData.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ease-in-out ${
            item.link === pathname
              ? 'text-blue-400 transform -translate-y-1'
              : 'hover:text-gray-200'
          }`}
        >
          <div
            className={`mb-1 ${
              item.link === pathname
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-transparent'
            } rounded-full p-2 transition-all duration-300 ease-in-out`}
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
