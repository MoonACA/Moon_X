import React from "react";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import { FiUpload } from "react-icons/fi";

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
  return (
    <div className="px-4 md:ml-4 mb-3 sm:mb-7">
      <div className="flex justify-start items-center">
        <div className="flex flex-col items-center">
          <Avatar
            sx={{
              width: { xs: 80, sm: 140 }, // Avatar width for different screens
              height: { xs: 80, sm: 120 }, // Avatar height for different screens
            }}
            variant="square"
          />
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
              placeholder="Display name"
              className="w-full border border-white bg-none p-2"
            />
            <div className="md:mt-2 mb-1">
              <label htmlFor="bio" className="text-white text-xs mb-1">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                placeholder="Write your bio here..."
                className="w-full border border-white bg-none p-2"
              />
            </div>
            <div className="mt-1 md:mt-2 md:mb-3">
              <button className="py-2 px-2 text-white bg-orange-600">
                Save Changes
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
