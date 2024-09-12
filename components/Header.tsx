/* 'use client';
import { useState, useEffect, useRef } from 'react';
import BrandLogo from '@/public/assets/BrandLogo.png';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiWallet3Line } from 'react-icons/ri';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
import ConnectWalletModal from './ConnectWalletModal';
export default function Header() {
  const router = useRouter();
  const [isConnect, setIsConnect] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const navItems = [
    { text: 'Home', Link: '', icon: <FaHome /> },
    { text: 'Course', Link: 'course', icon: <FaInfoCircle /> },
    { text: 'Swap', Link: 'admin', icon: <FaCogs /> },
    { text: 'Profile', Link: 'userprofile', icon: <FaEnvelope /> },
    { text: 'Reward', Link: 'reward', icon: <FaEnvelope /> },
  ];
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsConnect(false);
    }
  };

  useEffect(() => {
    if (isConnect) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isConnect]);

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
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
              sx={{
                '& .MuiDrawer-paper': {
                  width: '250px', // Change this value to adjust the width
                  top: '11%',
                  height: '50%', // Change this value to adjust the height
                },
              }}
            >
              <div className="flex justify-between items-center p-4">
                <span
                  className="text-lg font-bold"
                  onClick={() => router.push('/')}
                >
                  {' '}
                  <Image
                    src={BrandLogo}
                    alt="moonx logo"
                    height={20}
                    width={100}
                    className="cursor-pointer"
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
            <span onClick={() => router.push('/')} className="cursor-pointer">
              <Image src={BrandLogo} alt="moonx logo" height={20} width={100} />
            </span>
            <nav className="md:flex gap-12 items-center font-bold text-white hidden">
              <a
                href="#"
                className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
              >
                Home
              </a>
              <a
                href="/courses"
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

      
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <>
                  
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="px-4 py-2 rounded items-center md:inline-flex justify-center bg-gradient-to-r from-[#EB7568] to-[#FBB83E] transition-opacity duration-0 hover:opacity-100 hidden"
                            >
                              Connect Wallet
                            </button>

                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="rounded-full px-3 py-3 text-lg text-black bg-gradient-to-r from-[#EB7568] via-[#EB7568] to-[#FAB142] md:hidden"
                            >
                              <RiWallet3Line />
                            </button>
                          </>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
     
      {isConnect && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          ref={modalRef}
        >
          <ConnectWalletModal setIsConnect={setIsConnect} />
        </div>
      )}
    </header>
  );
}
 */
/* 'use client';
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import UserNav from '@/components/courses/UserNav'; // Import the UserNav component
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaTimes,
} from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [accountData, setAccountData] = useState({
    address: '',
    balance: '',
  });

  return (
    <>
      {isConnected ? (
        // Render the UserNav component when user is connected
        <UserNav account={accountData} />
      ) : (
        <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
          <div className="w-[90%] md:w-[80%] mx-auto py-5">
            <div className="container py-2  mx-auto shadow-glow  rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983] ">
              <div className="flex px-7 items-center justify-between">
                <div className="flex text-white text-xl md:hidden">
                  <GiHamburgerMenu className="cursor-pointer" />
                </div>
                <span
                  onClick={() => router.push('/')}
                  className="cursor-pointer"
                >
                  <Image
                    src={BrandLogo}
                    alt="moonx logo"
                    height={20}
                    width={100}
                  />
                </span>

                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          style: {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {!connected ? (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="px-4 py-2 rounded items-center md:inline-flex justify-center bg-gradient-to-r from-[#EB7568] to-[#FBB83E] transition-opacity duration-0 hover:opacity-100 hidden"
                          >
                            Connect Wallet
                          </button>
                        ) : (
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={openAccountModal} type="button">
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </button>
                            <button
                              onClick={() => {
                                setIsConnected(true);
                                setAccountData({
                                  address: account.address,
                                  balance: account.displayBalance || '',
                                });
                              }}
                            >
                              <UserNav account={account} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
 */
/* 'use client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'; // Import from wagmi
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BrandLogo from '@/public/assets/BrandLogo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiWallet3Line } from 'react-icons/ri';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaTimes,
} from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const { isConnected, address } = useAccount(); // Check if wallet is connected
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  // Redirect after wallet connection
  useEffect(() => {
    if (isConnected) {
      router.push('/userprofile'); // Redirect to user profile/dashboard
    }
  }, [isConnected, router]);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2 mx-auto shadow-glow rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983]">
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
              sx={{
                '& .MuiDrawer-paper': {
                  width: '250px',
                  top: '11%',
                  height: '50%',
                },
              }}
            >
              <div className="flex justify-between items-center p-4">
                <Image
                  src={BrandLogo}
                  alt="moonx logo"
                  height={20}
                  width={100}
                  className="cursor-pointer"
                />
                <IconButton onClick={handleDrawerClose}>
                  <FaTimes className="text-black text-sm" />
                </IconButton>
              </div>

              <List>
                {['Home', 'Course', 'Swap', 'Profile', 'Reward'].map((text) => (
                  <ListItem key={text} onClick={() => handleNavigation('/')}>
                    <ListItemIcon>
                      {text === 'Home' ? (
                        <FaHome />
                      ) : text === 'Course' ? (
                        <FaInfoCircle />
                      ) : (
                        <FaCogs />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>

            <Image
              src={BrandLogo}
              alt="moonx logo"
              height={20}
              width={100}
              className="cursor-pointer"
            />

            <nav className="md:flex gap-12 items-center font-bold text-white hidden">
              {['Home', 'Course', 'Swap', 'About Us'].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
                >
                  {text}
                </a>
              ))}
            </nav>

          
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: { opacity: 0, pointerEvents: 'none' },
                    })}
                  >
                    {!connected ? (
                      <>
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="px-4 py-2 rounded hidden md:block"
                        >
                          Connect Wallet
                        </button>
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="rounded-full px-3 py-3 md:hidden"
                        >
                          <RiWallet3Line />
                        </button>
                      </>
                    ) : (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </header>
  );
}
 */
'use client';
import { useState, useEffect, useRef } from 'react';
import BrandLogo from '@/public/assets/BrandLogo.png';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiWallet3Line } from 'react-icons/ri';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
import { useAccount } from 'wagmi';

export default function Header() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const navItems = [
    { text: 'Home', Link: '', icon: <FaHome /> },
    { text: 'Course', Link: 'course', icon: <FaInfoCircle /> },
    { text: 'Swap', Link: 'admin', icon: <FaCogs /> },
    { text: 'Profile', Link: 'userprofile', icon: <FaEnvelope /> },
    { text: 'Reward', Link: 'reward', icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    if (isConnected) {
      router.push('/userprofile');
    }
  }, [isConnected, router]);

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2  mx-auto shadow-glow  rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983] ">
          <div className="flex px-7 items-center justify-between">
            {/* ... (rest of your existing code) ... */}

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
              sx={{
                '& .MuiDrawer-paper': {
                  width: '250px',
                  top: '11%',
                  height: '50%',
                },
              }}
            >
              <div className="flex justify-between items-center p-4">
                <Image
                  src={BrandLogo}
                  alt="moonx logo"
                  height={20}
                  width={100}
                  className="cursor-pointer"
                />
                <IconButton onClick={handleDrawerClose}>
                  <FaTimes className="text-black text-sm" />
                </IconButton>
              </div>

              <List>
                {['Home', 'Course', 'Swap', 'Profile', 'Reward'].map((text) => (
                  <ListItem key={text} onClick={() => handleNavigation('/')}>
                    <ListItemIcon>
                      {text === 'Home' ? (
                        <FaHome />
                      ) : text === 'Course' ? (
                        <FaInfoCircle />
                      ) : (
                        <FaCogs />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>

            <Image
              src={BrandLogo}
              alt="moonx logo"
              height={20}
              width={100}
              className="cursor-pointer"
            />

            <nav className="md:flex gap-12 items-center font-bold text-white hidden">
              {['Home', 'Course', 'Swap', 'About Us'].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="hover:text-[#FBB53C] hover:border-b-[4px] hover:border-[#FBB53C]"
                >
                  {text}
                </a>
              ))}
            </nav>

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: { opacity: 0, pointerEvents: 'none' },
                    })}
                  >
                    {!connected ? (
                      <>
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="px-4 py-2 rounded items-center md:inline-flex justify-center bg-gradient-to-r from-[#EB7568] to-[#FBB83E] transition-opacity duration-0 hover:opacity-100 hidden"
                        >
                          Connect Wallet
                        </button>
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="rounded-full px-3 py-3 text-lg text-black bg-gradient-to-r from-[#EB7568] via-[#EB7568] to-[#FAB142] md:hidden"
                        >
                          <RiWallet3Line />
                        </button>
                      </>
                    ) : (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={openAccountModal} type="button">
                          {account.displayName}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }}
            </ConnectButton.Custom>

            {/* Replace your existing ConnectButton with the Web3Auth component */}
          </div>
        </div>
      </div>
    </header>
  );
}
