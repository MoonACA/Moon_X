import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import { FiUpload } from "react-icons/fi";
import { useUser } from "@/hooks/user/useUser";
import { useAccount } from "wagmi";
import { User } from "@/services/apiUsers";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import Image from "next/image";

interface NotificationSettingProps {
  title: string;
  description: string;
  isChecked: boolean;
}

const NotificationSetting: React.FC<NotificationSettingProps> = ({
  title,
  description,
  isChecked,
}) => (
  <div className=" pt-5 flex md:grid md:grid-cols-2 items-center">
    <div>
      <h3 className="text-white text-lg md:text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 text-xs md:text-sm font-semibold">
        {description}
      </p>
    </div>
    <div className="md:mt-2 md:justify-self-start">
      <Switch
        defaultChecked={isChecked}
        sx={{
          "& .MuiSwitch-switchBase": {
            color: "white",
            "&:not(.Mui-checked) .MuiSwitch-thumb": {
              backgroundColor: "white",
            },
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#e0e0e0",
            opacity: 1,
          },
          "&.Mui-checked .MuiSwitch-track": {
            backgroundColor: "#f5a623",
          },
        }}
        color="warning"
      />
    </div>
  </div>
);

const ProfileSettings: React.FC = () => {
  const { address } = useAccount();
  const { user, isPending, error } = useUser(address);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [displayName, setDisplayName] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [displayPic, setDisplayPic] = useState<string>();

  const { updateUser, isPending: updatingUser } = useUpdateUser();

  useEffect(() => {
    if (typeof user?.profilePicture == "string") {
      setDisplayPic(user?.profilePicture);
    }
    if (profilePicture) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) return;
        setDisplayPic(reader.result ? reader.result : undefined);
      };
      reader.readAsDataURL(profilePicture);
    }
  }, [user, profilePicture]);

  async function handleUpdate() {
    if (!address) throw new Error("Please connect your waller");
    const updatedUser: User = {
      walletAddress: address,
    };

    if (displayName) updatedUser["displayName"] = displayName;
    if (bio) updatedUser["bio"] = bio;
    if (profilePicture) updatedUser["profilePicture"] = profilePicture;

    updateUser({ user: updatedUser, walletAddress: address });
    console.log({ updatedUser });
  }

  return (
    <div className="px-4 md:ml-4 mb-3 sm:mb-7">
      <div className="flex justify-start items-center">
        <div className="flex flex-col items-center">
          <div>
            {displayPic ? (
              <Image
                src={displayPic}
                width={150}
                height={50}
                className="h-[130px]"
                alt=""
              />
            ) : (
              <Avatar
                sx={{
                  width: { xs: 80, sm: 140 }, // Avatar width for different screens
                  height: { xs: 80, sm: 120 }, // Avatar height for different screens
                }}
                variant="square"
              />
            )}
          </div>
          <label
            htmlFor="upload-photo"
            className="md:py-2 py-1 bg-gray-700 text-white text-xs text-center cursor-pointer flex items-center justify-center"
            style={{ width: "100%" }} // Ensure the button has the same width as the Avatar
          >
            <span className="inline-flex items-center justify-center">
              <FiUpload className="md:mr-2 md:flex hidden" /> Upload Photo
            </span>
          </label>
          <input
            type="file"
            id="upload-photo"
            style={{ display: "none" }} // Hide the input field
            onChange={(e) => setProfilePicture(e.target.files?.[0])}
          />
          <span className="text-center text-white text-[7px] mt-2">
            Image Size should be under 1MB <br /> and Image ratio needs to be
            1:1
          </span>
        </div>
        <div className="px-4 mx-auto w-full">
          <div className="flex flex-col mb-1 md:mb-2">
            <label htmlFor="display-name" className="text-white text-xs mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="display-name"
              defaultValue={user?.displayName}
              placeholder="Display name"
              className="w-full border border-white bg-none p-2"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <div className="md:mt-2 mb-1">
              <label htmlFor="bio" className="text-white text-xs mb-1">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                defaultValue={user?.bio}
                placeholder="Write your bio here..."
                className="w-full border border-white bg-none p-2"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="mt-1 md:mt-2 md:mb-3">
              <button
                className="py-2 px-2 text-white bg-orange-600"
                onClick={handleUpdate}
              >
                {updatingUser ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div className="pt-5 ">
          <h3 className="text-white text-2xl font-semibold">
            Notifications Alert
          </h3>
          <p className="text-gray-400 text-sm font-semibold">
            Recieve notifications on email?
          </p>
        </div>
      </div>
      {/* Notifications settings */}

      <NotificationSetting
        title="Airdrops and Tokens Update"
        description="Receive an email about token launches, airdrops and new features from MoonX"
        isChecked={false}
      />
      <NotificationSetting
        title="Recieve notifications on email?"
        description=""
        isChecked={false}
      />
    </div>
  );
};

export default ProfileSettings;
