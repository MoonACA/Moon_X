/* 'use client';
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
 */
/* 'use client';
import Image from 'next/image';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useRouter } from 'next/navigation';

interface UserNavProps {
  account: {
    displayBalance?: string;
    address: string;
  };
}

const UserNav: React.FC<UserNavProps> = ({ account }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2 mx-auto shadow-glow border border-white rounded-full bg-[#192A41]">
          <div className="flex px-6 items-center justify-between text-white">
            <div onClick={() => router.push('/')}>
              <Image
                src="/assets/BrandLogo.png"
                width={100}
                height={100}
                alt="logo"
                objectFit="contain"
              />
            </div>
          
            <div className="flex">
            
            </div>
            <div className="bg-[#021128] px-2 flex">
              <p className="bg-[#021128] rounded-lg p-[0.3rem] text-sm">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </p>
           
            </div>

            <div className="">
              <p className="text-sm">{account.displayBalance}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNav;
 */
/* 'use client';
import { useAccount } from 'wagmi';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/public/assets/BrandLogo.png';

const UserNav = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2 mx-auto shadow-glow border border-white rounded-full bg-[#192A41]">
          <div className="flex px-6 items-center justify-between text-white">
            <div onClick={() => router.push('/')}>
              <Image src={BrandLogo} width={100} height={100} alt="logo" />
            </div>
            <input
              type="text"
              placeholder="Search here...."
              className="md:flex w-[30rem] border border-white bg-transparent rounded-lg p-[0.3rem] hidden"
            />
            <div className="flex">
              <Avatar>H</Avatar>
              <IoMdArrowDropdown style={{ width: 30, height: 30 }} />
            </div>

            {isConnected && (
              <div className="bg-[#021128] px-2 flex">
                <p className="bg-[#021128] rounded-lg p-[0.3rem] text-sm">
                  {`${address?.substring(0, 6)}...${address?.substring(
                    address.length - 4
                  )}`}
                </p>
                <IoCopy className="ml-2 mt-1 text-white" />
              </div>
            )}

            <div className="">
              <p className="text-sm">0.00123 MAND</p>{' '}
             
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNav; */
/* 'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/public/assets/BrandLogo.png';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAccount, useBalance } from 'wagmi';

const UserNav: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}....${addr.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // You might want to add a toast notification here
    }
  };

  return (
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
            <div className="flex items-center">
              <Avatar>{address ? address[0].toUpperCase() : 'U'}</Avatar>
              <div className="inline-flex mt-1">
                <IoMdArrowDropdown style={{ width: 30, height: 30 }} />
              </div>
            </div>
            <div
              className="bg-[#021128] px-2 flex items-center cursor-pointer"
              onClick={copyToClipboard}
            >
              <p className=" bg-[#021128] rounded-lg p-[0.3rem] text-sm">
                {address ? shortenAddress(address) : '0x....'}
              </p>
              <div className="inline-flex mt-[6px]">
                <IoCopy
                  style={{
                    color: 'transparent',
                    stroke: 'white',
                    strokeWidth: '30',
                  }}
                />
              </div>
            </div>

            <div className="">
              <p className=" text-sm ">
                {balance
                  ? `${parseFloat(balance.formatted).toFixed(6)} ${
                      balance.symbol
                    }`
                  : '0.00 MAND'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNav;
 */
'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import logo from '@/public/assets/BrandLogo.png';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

const UserNav: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}....${addr.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // You might want to add a toast notification here
    }
  };

  const handleDisconnect = () => {
    disconnect();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2 mx-auto shadow-glow border border-white rounded-full bg-[#192A41]">
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
            <div className="flex items-center relative" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Avatar>{address ? address[0].toUpperCase() : 'U'}</Avatar>
                <div className="inline-flex mt-1">
                  <IoMdArrowDropdown style={{ width: 30, height: 30 }} />
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#192A41] rounded-md shadow-lg py-1 z-10 top-full">
                  <button
                    onClick={handleDisconnect}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#2C3E50]"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
            <div
              className="bg-[#021128] px-2 flex items-center cursor-pointer"
              onClick={copyToClipboard}
            >
              <p className="bg-[#021128] rounded-lg p-[0.3rem] text-sm">
                {address ? shortenAddress(address) : '0x....'}
              </p>
              <div className="inline-flex mt-[6px]">
                <IoCopy
                  style={{
                    color: 'transparent',
                    stroke: 'white',
                    strokeWidth: '30',
                  }}
                />
              </div>
            </div>

            <div className="">
              <p className="text-sm">
                {balance
                  ? `${parseFloat(balance.formatted).toFixed(6)} ${
                      balance.symbol
                    }`
                  : '0.00 MAND'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNav;
