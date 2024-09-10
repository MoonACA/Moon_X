'use client';

import React, { useState } from 'react';
import logo from '@/public/assets/moonx_icon.png';
import meta from '@/public/assets/metamask.png';
import phantom from '@/public/assets/phantom.png';
import trust from '@/public/assets/trust_wallet.png';
import coinbase from '@/public/assets/coinbase.png';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
/* import LowCreditModal from './LowCreditModal' */

interface IsConnect {
  /* setIsConnect: React.Dispatch<React.SetStateAction<boolean>> */
  setIsConnect: (value: boolean) => void;
}
const ConnectWalletModal: React.FC<IsConnect> = ({ setIsConnect }) => {
  /* 	const [isLowCred, setIsLowCred] = useState(false) */

  const wallets = [
    {
      title: 'Metamask',
      image: meta,
    },
    {
      title: 'Phantom',
      image: phantom,
    },
    {
      title: 'TrustWallet',
      image: trust,
    },
    {
      title: 'Coinbase',
      image: coinbase,
    },
  ];

  // const handleChange = () => {
  // 	setIsLowCred(true)
  // 	setIsConnect(false)
  // }

  return (
    <div className=" bg-[#000000be] h-[100vh] w-[100vw] fixed top-0 left-0 z-[2000] right-0 flex items-center justify-center">
      {/* 	{isLowCred && <LowCreditModal setIsLowCred={setIsLowCred} />} */}

      <div className=" bg-[#00122C] w-[25rem] rounded-lg mx-auto p-[1rem] max-sm:w-[90vw]">
        <div
          className=" text-white text-4xl flex justify-end mb-[1rem] cursor-pointer"
          onClick={() => setIsConnect(false)}
        >
          <IoClose />
        </div>
        <div className=" text-center">
          <Image
            src={logo}
            alt="logo"
            height={100}
            width={100}
            className=" mx-auto mb-[0.5rem]"
          />
          <h1 className=" text-[2rem] font-bold text-white max-sm:text-[1rem]">
            Connect to MoonX
          </h1>
        </div>

        <div className=" grid my-[1rem] bg-[#192A41] rounded-lg py-[0.5rem] px-[1rem]">
          {wallets.map((wallet, index) => (
            <div
              className={` flex items-center gap-2 p-[0.5rem] cursor-pointer ${
                index !== wallets.length - 1 && 'border-b border-white'
              }`}
              key={index}
              /* onClick={() => setIsLowCred(true)} */
            >
              <Image
                src={wallet.image}
                alt={wallet.title}
                width={40}
                height={40}
              />
              <p className=" text-white font-semibold">{wallet.title}</p>
            </div>
          ))}
        </div>

        <div className="">
          <p className=" text-center text-sm text-white cursor-pointer">
            More wallet options
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
