import { Button } from '@mui/material';
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
      <div style={{ border: '1px solid red' }} className='row text-center '>
        <div className='col-md-6'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class ID</th>
                <th>Teacher Name</th>
                <th>Join Now</th>



              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.classId}</td>
                  <td>{item.TeacherName}</td>
                  <td>
                    <Button onClick={()=>handleJoin(item.classId)} variant='contained' color='success'>
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
