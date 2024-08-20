import React from 'react';
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
export default function Footers() {
  return (
    <div className="h-[180px] bg-[#010E21] flex flex-col items-center justify-between py-1">
      <hr className="w-[90%] border-white h-[2px]" />
      {/* Image in the center */}
      <div className="flex-grow flex items-center justify-center">
        <Image src={BrandLogo} alt="MoonX Logo" width={90} height={90} />
      </div>

      {/* HR above the text */}
      <hr className="w-[90%] border-gray-600 mb-1" />

      {/* Text at the bottom */}
      <p className="text-slate-300 text-center font-poppins text-sm font-normal leading-[22px] ">
        &copy; Copyright {new Date().getFullYear()} All rights Reserved by Moon
        X
      </p>
    </div>
  );
}
