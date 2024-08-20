import React from 'react';
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
export default function Footers() {
  return (
<<<<<<< HEAD
    <div className="h-[180px] bg-[#010E21] flex flex-col items-center justify-between py-1">
      <hr className="w-[90%] border-white h-[2px]" />
      {/* Image in the center */}
      <div className="flex-grow flex items-center justify-center">
        <Image src={BrandLogo} alt="MoonX Logo" width={90} height={90} />
=======
    <div className="py-8  bg-[#00122C] ">
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
>>>>>>> 790dac59192404d2cc4480fc2bbb1e290345e0ec
      </div>
    </div>
  );
}
