import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from "next/navigation";

const NotificationComponent: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  console.log('notifications:', notifications);
  const history = useRouter();

  const handleJoinMeeting = (roomId: string) => {
    history.push(`/meeting/${roomId}`);

  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li key={index} className="p-4 bg-white rounded shadow-lg border-4 border-black" style={{ borderImage: 'url(/path-to-comic-border.png) 30 stretch' }}>
            <div className="flex justify-between items-center">
              <span>{notification.message}</span>
              <button 
                onClick={() => handleJoinMeeting(notification.data.roomId)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Join Meeting
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
