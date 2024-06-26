import { Socket, io } from 'socket.io-client';
import { addNotification } from '@/redux/slices/notficationsSlices'; // Assuming the 'notificationsSlice' module is located in the parent directory of the current file
import { store } from '@/redux/store';

// const socket = io('http://localhost:5000');
console.log('Connecting to socket server');
// @ts-ignore
const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKETS_URL);;  // Replace with your server URL


socket.on('connect', () => {
  console.log('Connected to socket server');
});

// socket.on('request-accepted', (data: { requestId: string; roomId: string }) => {
//  console.log('Request accepted')
//   store.dispatch(addNotification({
//     message: `Your request has been accepted. Join the meeting: ${data.roomId}`,
//     data: data,
//   }));
// });

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

export default socket;
