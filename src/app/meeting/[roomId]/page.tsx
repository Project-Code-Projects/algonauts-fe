// MeetingRoomPage.tsx
'use client'
import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import MeetingRoom from '@/components/helpRequest/MeetingRoom';
import { useParams } from 'next/navigation'
import { useGetHelpRequestByIdQuery } from '@/redux/api/helpRequestApi';
import { getUserInfo } from '@/services/auth.service';
import { User } from 'lucide-react';
import { USER_TYPE } from '@/constants/type';
interface Params {
  params: { roomId: string };
}
const MeetingRoomPage = ({params}:Params) => {
  const roomId = params.roomId;
  const userInfo = getUserInfo();

  
  const [peerId, setPeerId] = React.useState<string>('');
  const [remotePeerId, setRemotePeerId] = React.useState<string>('');
  const {
    data: helpRequestData,
    isLoading: helpRequestIsLoading,
    isError: helpRequestIsError,
  } = useGetHelpRequestByIdQuery(roomId);


  const helpRequest = helpRequestData?.data;
  
  useEffect(() => {
    console.log('help request')
    console.log(helpRequest)
    if (helpRequest) {
      if(userInfo.type === USER_TYPE.STUDENT){
        console.log('student')
        setPeerId(helpRequest.studentId);
        setRemotePeerId(helpRequest.instructorId);
      } else if(userInfo.type === USER_TYPE.INSTRUCTOR){
        console.log('instructor')

        setPeerId(helpRequest.instructorId);
        setRemotePeerId(helpRequest.studentId);
      }

    }
  }, [helpRequestData]);

  if (helpRequestIsError) {
    return <div>Error...</div>;
  }

  if (helpRequestIsLoading) {
    return <div>Loading...</div>;
  }
;
  return <>

    {helpRequestData && peerId!='' && remotePeerId!=='' && (
        // console.log('student')
      <MeetingRoom roomId={roomId} meetingPeerId={peerId} meetingRemotePeerId={remotePeerId} />
    )}
  </>;
};

export default MeetingRoomPage;
