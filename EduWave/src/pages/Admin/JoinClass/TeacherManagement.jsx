import { Button } from '@mui/material';
import React from 'react';
import { joinLiveClass } from '../../../service/StudentApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import './JoinClass.css'
// import '../../Student/Profile/Profile.css'

function TeacherManagement() {

  const navigate = useNavigate();
  const data = [
    {
      name: 'DMW',
      classId: 'abcd',
      TeacherName: 'abc',
    },
    {
      name: 'DMW',
      classId: 'abcd',
      TeacherName: 'abc',
    },
    {
      name: 'DMW',
      classId: 'abcd',
      TeacherName: 'abc',
    },
    {
      name: 'DMW',
      classId: 'abcd',
      TeacherName: 'abc',
    },
    {
      name: 'DMW',
      classId: 'abcd',
      TeacherName: 'abc',
    },
  ];


  const handleJoin = async(classId) => {
    console.log(classId);
    const res = await joinLiveClass(classId);
    const classID = res.classRoomId;

    if(classID){
      navigate(`/room/${classID}`);
    }


    console.log("this is res in joinclass -->", res);

    if(res){
      toast.success("Class Joined Successfull!!  ")
    }
  }

  return (
    <div>
      <h1>Teacher managemet here !!!!!!!!!!!!!</h1>
    </div>
  );
}

export default TeacherManagement;
