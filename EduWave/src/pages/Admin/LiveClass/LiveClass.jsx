import React, { useCallback, useState } from 'react'
import Layout from '../../../components/Layout/Layout';
import webrtc from "../../../assets/img/webrtc.gif";
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { startLiveClass } from '../../../service/TeacherApi';
import { useTeacher } from '../../../context/Teacher';
import './LiveClass.css'
import Button from 'react-bootstrap/Button';
// import Input from 'react-bootstrap/Input'

const LiveClass = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    const { teacherData, setTeacherData } = useTeacher();

    // const handleJoinRoom = useCallback(() => {
    //     const res = 



    //     // navigate(`/room/${roomID}`);
    //     toast.success("Successfull Room Join")
    // }, [navigate, roomID])



    const handleJoinRoom = async()=>{
        console.log("teacher data" , teacherData);
        navigate(`/room/${roomID}`);

        // const res = await startLiveClass({
        //     classId : "abcd",   
        //      teacherId :  teacherData.teacherID,  
             
        //      classRoomId: roomID
            
        // })

        // console.log("this is res -->", res);

        // if(res){
          
        //     toast.success("Class Created Successfull!!  ")
        // }


    }



    return (
        <>


            <div className='container text-center  '>
                <div style={{ height: "100vh" }} className='row h-100  pt-5'>
                    <div className='col-md-6' style={{width:"40%"}}>

                        <h3>Generate Class Code </h3>

                        <div className=' align-items-center' style={{width:"50%",margin:"10px auto"}}>
                            <Input className='m-3' type="text" placeholder='Enter Room Code ' value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                            <Button style={{color:"white"}}  onClick={handleJoinRoom} className='btn-create'>Create Class </Button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='container text-center'>

                            <img style={{ width: "50%" }} src={webrtc} alt="web-rtc dig." />

                        </div>
                    </div>



                </div>
            </div>

        </>

    )
}

export default LiveClass;