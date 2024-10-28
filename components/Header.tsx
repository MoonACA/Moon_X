"use client";
import { useState, useEffect } from "react";
import BrandLogo from "@/public/assets/BrandLogo.png";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiWallet3Line } from "react-icons/ri";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAccount } from "wagmi";

export default function Header() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sessionId, setSessionId] = useState("your-session-id-here");

  const handleNavigation = (path: string) => {
    router.push(path);
    handleDrawerClose();
  };

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const navItems = [
    { text: "Home", Link: "", icon: <FaHome /> },
    { text: "Course", Link: "course", icon: <FaInfoCircle /> },
    { text: "Swap", Link: "admin", icon: <FaCogs /> },
    { text: "Profile", Link: "userprofile", icon: <FaEnvelope /> },
    { text: "Reward", Link: "reward", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    if (isConnected && address) {
      registerUser(sessionId, address); // Pass both sessionId and userAddress
      router.push("/courses");
    }
  }, [isConnected, address, router]);

  const registerUser = async (sessionId: string, userAddress: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_address: userAddress,
        }),
      });
      const data = await response.json();
      console.log("Registration Response:", data);
    } catch (error) {
      console.error("Error during user registration:", error);
    }
  };

  return (
    <header className="sticky top-0 bg-[#00122C] z-50 backdrop-blur-sm">
      <div className="w-[90%] md:w-[80%] mx-auto py-5">
        <div className="container py-2 mx-auto shadow-glow rounded-full bg-gradient-to-r from-[#00122C] to-[#3c5983] ">
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
                "& .MuiDrawer-paper": {
                  width: "250px",
                  top: "11%",
                  height: "50%",
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
                {navItems.map(({ text, Link, icon }) => (
                  <ListItem key={text} onClick={() => handleNavigation(Link)}>
                    <ListItemIcon>{icon}</ListItemIcon>
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
              {["Home", "Course", "Swap", "About Us"].map((text) => (
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
                      "aria-hidden": true,
                      style: { opacity: 0, pointerEvents: "none" },
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
                      <div style={{ display: "flex", gap: 12 }}>
                        <button onClick={openAccountModal} type="button">
                          {account.address}
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
