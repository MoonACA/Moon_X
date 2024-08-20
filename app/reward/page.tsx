'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Rewardcard from '@/components/usertabs/Rewardcard';
import Leaderboard from '@/components/usertabs/LeaderboardCard';

export default function Reward() {
  const [activeTab, setActiveTab] = useState('Reward');
  const renderContent = () => {
    switch (activeTab) {
      case 'Reward':
        return <Rewardcard />;

      case 'Leaderboard':
        return <Leaderboard />;

      default:
        return null;
    }
  };
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
<<<<<<< HEAD
      <div className=" w-[80vw] mx-auto max-sm:w-[98vw]">
        <div className="bg-[#192A41]  border rounded-[2rem] border-white">
          <div className="bg-[#00122C] rounded-t-[2rem]  flex  items-center py-[3rem] justify-center">
            <h3 className="text-white  text-lg">Rewards</h3>{' '}
=======
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
>>>>>>> 790dac59192404d2cc4480fc2bbb1e290345e0ec
          </div>
          <hr className="bg-white  h-[2px]" />
          <div className="bg-[#192A41] rounded-[2rem]  py-[1rem]">
            {/* tab */}

            <div className="px-[1rem] flex items-center gap-1 justify-between">
              <button
                onClick={() => setActiveTab('Reward')}
                className={`w-1/2 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500 ${
                  activeTab === 'Reward'
                    ? 'bg-[#FFEECB] font-semibold text-black'
                    : 'text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black'
                }`}
              >
                Reward
              </button>

              <button
                onClick={() => setActiveTab('Leaderboard')}
                className={`w-1/2 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500 ${
                  activeTab === 'Leaderboard'
                    ? 'bg-[#FFEECB] font-semibold text-black'
                    : 'text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black'
                }`}
              >
                Leaderboard
              </button>
            </div>
            <div className="mt-4">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
