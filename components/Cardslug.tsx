'use client';
import { FaArrowLeft } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Rating from '@mui/material/Rating';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { useState } from 'react';
export default function Cardslug() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const value = 5;
  const label = '4.7';
  function handleClick() {
    console.info('You clicked a breadcrumb.');
  }
  const breadcrumbs = [
    <Link
      key="1"
      className="text-xs text-slate-500"
      href="/"
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      key="2"
      className="text-slate-500 text-xs"
      href="/home"
      onClick={handleClick}
    >
      Development
    </Link>,
  ];
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className=" w-[80vw] mx-auto max-sm:w-[80vw]">
        <div>
          <div className="flex justify-start items-center gap-5 mb-6  text-white">
            <FaArrowLeft />
            Course details
          </div>
          {/* card */}
          <div className="bg-[#192A41] flex  border rounded-xl border-white">
            {/* for border */}
            <div className="p-[1rem] sm:p-[2rem]">
              {/* for menu */}
              <div className="flex justify-start items-center ">
                <Breadcrumbs
                  separator={
                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  }
                  aria-label="breadcrumb"
                  className="text-slate-500 "
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </div>
              {/* for heading */}
              <div className="flex flex-col mb-3 sm:mb-7 sm:flex-row space-y-4 sm:space-y-0  items-center justify-between">
                <h1 className="text-white font-bold text-xl sm:text-2xl text-center sm:text-left">
                  Introduction to blockchain technology
                </h1>
                <button className="bg-white text-black py-2 px-3 sm:py-3 sm:px-4 font-medium rounded-lg">
                  write a review
                </button>
              </div>
              {/* for content */}
              <div className=" mb-3 sm:mb-7">
                <p className="text-gray-400 flex flex-col items-center ">
                  Learn About the fundamentals of blockchain technology.
                  understand how it works it history, and its potential
                  application across various industries. this course is perfect
                  for beginners looking to grasp the basics.
                </p>
              </div>
              {/* for author and rating */}
              <div className="flex mb-3 md:mb-7 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4">
                  <AvatarGroup max={4}>
                    <Avatar alt="Oke john" src="/static/images/avatar/1.jpg" />
                    <Avatar
                      alt="Faith chike"
                      src="/static/images/avatar/2.jpg"
                    />
                  </AvatarGroup>
                  <div className="hidden md:inline-block text-gray-400">
                    <p className="text-xs">Created By</p>
                    <div className="flex text-sm">
                      <p>Oke john . </p>
                      <p>Faith chike </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-2">
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    className="text-sm md:text-lg"
                  />
                  <p className="text-gray-400 ">
                    4.7{' '}
                    <span className="text-gray-400 text-xs">
                      (4,514 Rating)
                    </span>
                  </p>
                </div>
              </div>
              {/* for video */}
              <div className="relative w-full  mb-3 md:mb-7 ">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  light="/assets/Trailer.png"
                  playing
                  controls
                  width="100%"
                  style={{ borderRadius: 2 }}
                />
              </div>
              {/* for description */}
              <div className="">
                <div className="flex items-center justify-start mb-3 md:mb-7">
                  <h2 className="text-white font-bold text-xl">Description</h2>
                </div>
                <div className=" mb-3 md:mb-7 ">
                  <p
                    className={`text-base text-gray-400 ${
                      isExpanded ? '' : 'line-clamp-3 md:line-clamp-none'
                    }`}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Mollitia dicta fugiat labore dolorum ducimus! Delectus
                    labore incidunt blanditiis minima, optio dolorem cumque sed
                    eligendi fugit, magnam ipsum ea! Non, delectus! Voluptas
                    suscipit eligendi non velit, optio sed, labore corrupti
                    voluptatem, sit in at obcaecati libero? Animi et dolor
                    placeat in enim possimus, saepe totam, corporis commodi aut
                    maiores fugit temporibus. Iusto, quod. Suscipit, beatae
                    itaque. Sequi temporibus iusto tenetur nisi reiciendis nobis
                    dicta quaerat id. Tempore odio officiis porro temporibus
                    debitis illum rem ea harum, perspiciatis aspernatur ducimus
                    ipsa in. Voluptatum perspiciatis inventore aperiam nisi?
                    Sequi, voluptas illum reprehenderit at a deleniti excepturi
                    id maiores distinctio eius cupiditate voluptatibus tempore,
                    ad doloribus soluta ducimus, quaerat corporis praesentium
                    eos voluptate unde! Esse voluptates quam commodi, blanditiis
                    culpa quae veritatis autem nisi, enim maiores tenetur
                    asperiores dolor molestias libero consequuntur nemo. Libero,
                    tenetur dignissimos illo minima nobis vitae quia. Nemo, quia
                    adipisci. Praesentium quia voluptatem, magni suscipit
                    incidunt in repudiandae cum assumenda dignissimos deleniti,
                    explicabo expedita vero ducimus eveniet, fuga amet quas.
                    Atque fugit sit expedita tempore aspernatur eius assumenda.
                    Porro, aperiam! Aspernatur veniam ea porro officiis laborum
                    doloribus. Doloribus cumque, adipisci quasi quam alias omnis
                    totam ipsam voluptatum nulla sit maxime nihil pariatur
                    suscipit dolorum molestias neque porro! Repellat, quisquam
                    blanditiis. Hic expedita voluptatem fuga iusto, similique ab
                    dicta itaque ipsam. Laboriosam similique amet error quaerat
                    illum inventore quis cupiditate culpa ipsam? Quae, dicta
                    unde eum quam id obcaecati quisquam recusandae! Nulla, sed?
                    Explicabo dolorum iure soluta veniam, consectetur aliquid
                    laboriosam provident repellendus, porro labore hic enim
                    accusantium officia consequuntur. Maxime laboriosam quam,
                    libero a amet ex pariatur inventore ipsam odio! Vero
                    deleniti commodi id ut minima, obcaecati repellendus, sint
                    tempora omnis labore, ex recusandae suscipit illum voluptate
                    eveniet? Eligendi maiores ducimus illo quasi nulla assumenda
                    id aliquid libero sunt perspiciatis. Cumque ad odit
                    similique cupiditate, incidunt quas officia eum illo
                    veritatis est eius consectetur saepe vitae voluptate
                    voluptatibus labore quasi. Aliquam, natus odit? Iusto totam
                    obcaecati ratione a assumenda corporis! Autem ut, quos quis
                  </p>
                  <button
                    onClick={toggleReadMore}
                    className="text-blue-500 md:hidden"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
