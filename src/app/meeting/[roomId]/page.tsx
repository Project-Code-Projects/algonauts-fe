// MeetingRoomPage.tsx
import React from 'react';
// import { useParams } from 'react-router-dom';
import MeetingRoom from '@/components/helpRequest/MeetingRoom';
import { useParams } from 'next/navigation'

interface Params {
  params: { roomId: string };
}
const MeetingRoomPage = ({params}:Params) => {
  const roomId = params.roomId;

  return <MeetingRoom roomId={roomId} />;
};

export default MeetingRoomPage;
