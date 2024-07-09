'use client'

import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaPhoneSlash } from 'react-icons/fa';

interface MeetingRoomProps {
  roomId: string;
  meetingPeerId: string;
  meetingRemotePeerId: string;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ roomId, meetingPeerId, meetingRemotePeerId }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [call, setCall] = useState<any | null>(null);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const newPeer = new Peer(meetingPeerId, {
      host: process.env.NEXT_PUBLIC_PEERJS_HOST,
      port: Number(process.env.NEXT_PUBLIC_PEERJS_PORT),
      path: '/peerjs/myapp',
      // secure: process.env.NEXT_PUBLIC_PEERJS_SECURE === 'true',
      debug: 3, // Enable debugging
      config: {
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:global.relay.metered.ca:80",
            username: "62dafdf8f290a4c29e122472",
            credential: "jdQlBBxQc4MCNzkN",
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: "62dafdf8f290a4c29e122472",
            credential: "jdQlBBxQc4MCNzkN",
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username: "62dafdf8f290a4c29e122472",
            credential: "jdQlBBxQc4MCNzkN",
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: "62dafdf8f290a4c29e122472",
            credential: "jdQlBBxQc4MCNzkN",
          },
        ],
      }
    });

    newPeer.on('open', (id) => {
      setPeerId(id);
      console.log('My peer ID is: ' + id);
    });

    newPeer.on('call', handleIncomingCall);

    newPeer.on('error', (err) => {
      setError(`An error occurred with the peer connection: ${err.type}`);
      console.error('Peer error:', err);
    });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, [meetingPeerId]);

  const handleIncomingCall = (incomingCall: any) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        incomingCall.answer(stream);
        setCall(incomingCall);
        setIsCallActive(true);
        incomingCall.on('stream', handleRemoteStream);
      })
      .catch((err) => {
        setError(`Failed to access media devices: ${err.message}`);
        console.error('Media device error:', err);
      });
  };

  const handleRemoteStream = (remoteStream: MediaStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  };

  const startCall = () => {
    if (peer) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }

          const outgoingCall = peer.call(meetingRemotePeerId, stream);
          setCall(outgoingCall);
          setIsCallActive(true);
          outgoingCall.on('stream', handleRemoteStream);
        })
        .catch((err) => {
          setError(`Failed to start call: ${err.message}`);
          console.error('Start call error:', err);
        });
    } else {
      setError('Peer connection is not established.');
    }
  };

  const endCall = () => {
    if (call) {
      call.close();
      setIsCallActive(false);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsAudioMuted(!track.enabled);
      });
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsVideoOff(!track.enabled);
      });
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Video Call with PeerJS</h1>
      {peerId ? (
        <p className="text-center mb-4">Your peer ID: <span className="font-mono bg-gray-200 p-1 rounded">{peerId}</span></p>
      ) : (
        <p className="text-center mb-4">Connecting...</p>
      )}
      {/* {error && <p className="text-center mb-4 text-red-500">{error}</p>} */}
      <div className="flex justify-center mb-4">
        {!isCallActive ? (
          <button 
            onClick={startCall} 
            className="mx-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            <FaPhone />
          </button>
        ) : (
          <button 
            onClick={endCall} 
            className="mx-2 py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            <FaPhoneSlash />
          </button>
        )}
        <button 
          onClick={toggleAudio} 
          disabled={!isCallActive} 
          className={`mx-2 py-2 px-4 rounded ${!isCallActive ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
        >
          {isAudioMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
        <button 
          onClick={toggleVideo} 
          disabled={!isCallActive} 
          className={`mx-2 py-2 px-4 rounded ${!isCallActive ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center relative">
          <h2 className="text-xl font-semibold mb-2">Local Video</h2>
          <video ref={localVideoRef} autoPlay muted className="rounded-lg shadow-lg w-full"></video>
          {isAudioMuted && (
            <FaMicrophoneSlash className="absolute top-4 left-4 text-white text-2xl bg-black bg-opacity-50 p-1 rounded" />
          )}
          {isVideoOff && (
            <FaVideoSlash className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 p-1 rounded" />
          )}
        </div>
        <div className="flex flex-col items-center relative">
          <h2 className="text-xl font-semibold mb-2">Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay className="rounded-lg shadow-lg w-full"></video>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;