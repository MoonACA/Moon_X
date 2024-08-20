import React from 'react';
import Avatar from '@mui/material/Avatar';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  return (
    <div className="p-[1rem] sm:p-[2rem]">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold text-xl">Notifications</p>
        </div>
        <div>
          <button
            className="text-black rounded-lg text-sm bg-white py-2 px-2"
            onClick={onMarkAsRead}
          >
            Mark as Read
          </button>
        </div>
      </div>

      {notifications.map((notification) => (
        <div key={notification.id}>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Avatar
                alt="Notification Avatar"
                src="/static/images/avatar/1.jpg"
                sx={{
                  width: { xs: 40, sm: 50 }, // 40px width for mobile, 50px for larger screens
                  height: { xs: 40, sm: 50 }, // 40px height for mobile, 50px for larger screens
                }}
              />
              <div className="mt-1">
                <p className="text-white md:text-sm">{notification.message}</p>
                <p className="text-white font-thin md:text-sm mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
            <div className="mb-2">
              <span
                className={`block w-2 h-2 sm:w-3 sm:h-3 ${
                  notification.read ? 'bg-gray-400' : 'bg-[#F97316]'
                }  rounded-full`}
              ></span>
            </div>
          </div>
          <hr className="bg-white h-[2px] mt-5 mb-5" />
        </div>
      ))}
    </div>
  );
};

export default Notifications;
