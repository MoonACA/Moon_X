import React from 'react';
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
export default function Footer() {
  return (
    <footer className="py-8  bg-[#00122C] ">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image src={BrandLogo} alt="MoonX Logo" width={90} height={90} />
        </div>
        <div className="mb-6">
          <p className="text-blue-50 text-center  font-poppins text-sm font-normal leading-[22px]">
            &copy; CopyRight {new Date().getFullYear()} All rights Reserved by
            Moon X
          </p>
        </div>
      </div>
    </footer>
  );
}
