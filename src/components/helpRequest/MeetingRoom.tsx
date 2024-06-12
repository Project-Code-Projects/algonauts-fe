'use client'
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { set } from 'react-hook-form';

interface MeetingRoomProps {
  roomId: string;
  meetingPeerId: string;
  meetingRemotePeerId: string;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ roomId, meetingPeerId, meetingRemotePeerId }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string>('');
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const newPeer = new Peer(meetingPeerId, {
      host: 'localhost', // replace with your server host
      port: 5000, // replace with your server port
      // path: '/myapp',
      path: '/peerjs/myapp',

      // secure: false, // Set to true if using HTTPS
    });

    newPeer.on('open', (id) => {
      setPeerId(id);
      console.log('My peer ID is: ' + id);
    });

    newPeer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      });
    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, []);

  const startCall = () => {
    if (peer) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const call = peer.call(meetingRemotePeerId, stream);
        call.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      });
    }
  };

  return (
    <div>
      <h1>Video Call with PeerJS</h1>
      {peerId ? <p>Your peer ID: {peerId}</p> : <p>Connecting...</p>}
      {/* <input
        type="text"
        placeholder="Enter remote peer ID"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      /> */}
      <button onClick={startCall}>Call</button>
      <div>
        {/* <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }}></video> */}
        <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }}></video>
      </div>
    </div>
  );
};

export default MeetingRoom;
