'use client';
import { useState } from 'react';
import BrandLogo from '@/public/assets/BrandLogo.png';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiWallet3Line } from 'react-icons/ri';
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaTimes,
} from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
export default function Header() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const navItems = [
    { text: 'Home', Link: '/', icon: <FaHome /> },
    { text: 'Course', Link: 'course', icon: <FaInfoCircle /> },
    { text: 'Swap', Link: 'swap', icon: <FaCogs /> },
    { text: 'About Us', Link: 'about', icon: <FaEnvelope /> },
  ];
  return (
    <header className="sticky top-0 bg-[#00122C] z-50">
      <div className="py-5">
        <div className="container py-2  mx-auto shadow-glow  rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983] ">
          <div className="flex px-7 items-center justify-between">
            <div className="flex text-white text-xl md:hidden">
              <GiHamburgerMenu
                onClick={handleDrawerOpen}
                className="cursor-pointer"
              />
            </div>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={handleDrawerClose}
              PaperProps={{
                sx: {
                  width: 240,
                  top: '10%',
                  height: '50%',
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: 3,
                },
              }}
            >
              <div className="flex justify-between items-center p-4">
                <span className="text-lg font-bold">
                  {' '}
                  <Image
                    src={BrandLogo}
                    alt="moonx logo"
                    height={20}
                    width={100}
                    className="cursor-pointer"
                    onClick={() => router.push('/')}
                  />
                </span>
                <IconButton onClick={handleDrawerClose}>
                  <FaTimes className="text-black text-sm" />
                </IconButton>
              </div>
              <div className="flex flex-col justify-center items-center space-y-2 px-3">
                <button className="py-2 w-full font-semibold text-black rounded-lg bg-gradient-to-r from-[#EB7568] via-[#EB7568] to-[#FAB142]">
                  connect wallet
                </button>
              </div>
              <hr className="text-black mt-2 bg-black " />
              <List>
                {navItems.map((item) => (
                  <ListItem
                    key={item.text}
                    onClick={() => handleNavigation('/')}
                    className="hover:bg-[#EB7568]  rounded-lg cursor-pointer"
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>

            <Image
              src={BrandLogo}
              alt="moonx logo"
              height={20}
              width={100}
              onClick={() => router.push('/')}
            />
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
