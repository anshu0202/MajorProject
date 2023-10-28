// import { Button } from '@mui/material';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { joinLiveClass } from '../../../service/StudentApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function JoinClass() {

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
      <div  >
        <div >
          <table style={{width:"75vw",border:"1px solid black",borderRadius:"25px"}} >
            <thead  style={{margin:"20px",borderRadius:"20px"}} >
              <tr >
                <th style={{padding:"10px"}}>Name</th>
                <th style={{padding:"10px"}}>Class ID</th>
                <th style={{padding:"10px"}}>Teacher Name</th>
                <th style={{padding:"10px"}}>Join Now</th>



              </tr>
            </thead>
            <tbody style={{margin:"2vh",padding:"2vh"}} >
              {data.map((item, index) => (
                <tr key={index} style={{borderRadius:"20px",margin:"2vh"}}>
                  <td style={{padding:"10px"}}>{item.name}</td>
                  <td style={{padding:"10px"}}>{item.classId}</td>
                  <td style={{padding:"10px"}}>{item.TeacherName}</td>
                  <td style={{padding:"10px"}}>
                    <Button className='btn' onClick={()=>handleJoin(item.classId)} variant='contained' color='success'>
                      Join Class

                    </Button>
                  </td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-md-6'>
          other stuff here !!!!
        </div>
      </div>
    </div>
  );
}

export default JoinClass;
