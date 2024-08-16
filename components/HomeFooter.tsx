import React from 'react';
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
export default function Footers() {
  return (
    <div className="py-14  bg-[#010E21]">
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image src={BrandLogo} alt="MoonX Logo" width={90} height={90} />
        </div>
        <div className="mb-6">
          <p className="text-slate-300 text-center  font-poppins text-sm font-normal leading-[22px]">
            &copy; CopyRight {new Date().getFullYear()} All rights Reserved by
            Moon X
          </p>
        </div>
      </div>
    </div>
  );
}
