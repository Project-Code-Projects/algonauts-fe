import { getUserInfo } from '@/services/auth.service'
import React from 'react'

const StudentPage = () => {
       const userInfo = getUserInfo() as any;
       console.log(userInfo?.type);


  return (
    <div>StudentPage</div>
  )
}

export default StudentPage