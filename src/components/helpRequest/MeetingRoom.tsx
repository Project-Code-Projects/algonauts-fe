'use client'
import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';

interface MeetingRoomProps {
  roomId: string;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ roomId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer>();

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: 'localhost',
      port: 5000,
      path: 'myapp', // This line is already correct
      // secure: false, // Change to true if using HTTPS
    });
    peerRef.current = peer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        });

        if (roomId) {
          const call = peer.call(roomId, stream);

          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    return () => {
      peer.destroy();
    };
  }, [roomId]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default MeetingRoom;
