import Image from 'next/image';
import React from 'react';
import coin from '@/public/assets/coin.png';
export default function page() {
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className=" w-[78vw] mx-auto max-sm:w-[90vw]">
        <p className="text-lg text-[#fff]   mb-[2rem]">Rewards</p>
        <div className="grid justify-items-center  md:place-items-start gap-4 md:gap-0 grid-cols-1 md:grid-cols-4">
          {/* card */}
          <div className=" w-[80%] md:w-[15rem]  py-[1rem] rounded-md flex items-center justify-center flex-col bg-gradient-to-br from-[#89BFDD] to-[#DFB1CC]">
            <div className="">
              <Image src={coin} alt="coins" />
            </div>
            <div className="text-center font-semibold mt-4 px-3">
              <p className="">
                Congratulations! You&quot;ve earned 10 Mand for completing your
                course
              </p>
            </div>
            <div className="pt-2">
              <button className=" font-semibold rounded-xl px-10 bg-white">
                {' '}
                Claim your <br /> rewards Now
              </button>
            </div>
          </div>
          {/* card */}
          <div className="w-[15rem] py-[1rem] rounded-md flex items-center justify-center flex-col bg-gradient-to-br from-[#89BFDD] to-[#DFB1CC]">
            <div className="">
              <Image src={coin} alt="coins" />
            </div>
            <div className="text-center font-semibold mt-4 px-3">
              <p className="">
                Congratulations! You&quot;ve earned 10 Mand for completing your
                course
              </p>
            </div>
            <div className="pt-2">
              <button className=" font-semibold rounded-xl px-10 bg-white">
                {' '}
                Claim your <br /> rewards Now
              </button>
            </div>
          </div>
          {/* card */}
          <div className="w-[15rem] py-[1rem] rounded-md flex items-center justify-center flex-col bg-gradient-to-br from-[#89BFDD] to-[#DFB1CC]">
            <div className="">
              <Image src={coin} alt="coins" />
            </div>
            <div className="text-center font-semibold mt-4 px-3">
              <p className="">
                Congratulations! You&quot;ve earned 10 Mand for completing your
                course
              </p>
            </div>
            <div className="pt-2">
              <button className=" font-semibold rounded-xl px-10 bg-white">
                {' '}
                Claim your <br /> rewards Now
              </button>
            </div>
          </div>
          {/* card */}
          <div className="w-[15rem] py-[1rem] rounded-md flex items-center justify-center flex-col bg-gradient-to-br from-[#89BFDD] to-[#DFB1CC]">
            <div className="">
              <Image src={coin} alt="coins" />
            </div>
            <div className="text-center font-semibold mt-4 px-3">
              <p className="">
                Congratulations! You&quot;ve earned 10 Mand for completing your
                course
              </p>
            </div>
            <div className="pt-2">
              <button className=" font-semibold rounded-xl px-10 bg-white">
                {' '}
                Claim your <br /> rewards Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
