import BrandLogo from '@/public/assets/BrandLogo.png';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiWallet3Line } from 'react-icons/ri';
export default function Header() {
  return (
    <header className="sticky top-0 bg-[#00122C]">
      <div className="py-5">
        <div className="container py-2  mx-auto shadow-glow  rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983] ">
          <div className="flex px-7 items-center justify-between">
            <div className="flex text-white text-xl md:hidden">
              <GiHamburgerMenu />
            </div>
            <Image src={BrandLogo} alt="moonx logo" height={20} width={100} />
            <nav className="md:flex gap-12 items-center font-bold text-white hidden">
              <a
                href="#"
                className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
              >
                Course
              </a>
              <a
                href="#"
                className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
              >
                Swap
              </a>
              <a
                href="#"
                className="hover:text-[#FBB53C] hover:border-b-[3px] hover:border-[#FBB53C]"
              >
                About Us
              </a>
            </nav>
            <button className="px-4 py-2 rounded items-center md:inline-flex justify-center bg-gradient-to-r from-[#EB7568] to-[#FBB83E] transition-opacity duration-0 hover:opacity-100 hidden">
              Connect wallet
            </button>
            {/* mobile button */}
            <button className=" rounded-full px-3 py-3 text-lg text-black bg-gradient-to-r from-[#EB7568] via-[#EB7568] to-[#FAB142] md:hidden">
              <RiWallet3Line />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
