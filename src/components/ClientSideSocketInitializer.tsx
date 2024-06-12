// components/ClientSideSocketInitializer.tsx
'use client'
import { use, useEffect } from 'react';
import socket from '../services/socket';
import { RootState } from '@/redux/store';
import { store } from '@/redux/store';
import { addNotification } from '@/redux/slices/notficationsSlices'; // Assuming the 'notificationsSlice' module is located in the parent directory of the current file
import { getUserInfo } from '@/services/auth.service';

const ClientSideSocketInitializer: React.FC = () => {
  const user = getUserInfo();
  useEffect(() => {
    console.log('Connecting to socket...');
    console.log('User:', user);
    socket.connect();

    if(user && user._id){
      console.log('Registering user...');
      socket.emit('register-user', user._id);
    }

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('request-accepted', (data: { requestId: string; roomId: string }) => {
      console.log('Request accepted from servers');
      store.dispatch(addNotification({
        message: `Your request has been accepted. Join the meeting: ${data.roomId}`,
        data: data,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default ClientSideSocketInitializer;
