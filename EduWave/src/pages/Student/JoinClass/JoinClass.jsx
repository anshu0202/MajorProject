// import { Button } from '@mui/material';
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { getLiveClassList, joinLiveClass } from "../../../service/StudentApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getClasstById, getSubjectById } from "../../../service/AdminApi";
import { getTeacherInfo } from "../../../service/TeacherApi";

function JoinClass() {
  const navigate = useNavigate();
  const [classList, setClassList] = useState([]);

  const data = [
    {
      name: "DMW",
      classId: "abcd",
      TeacherName: "abc",
    },
    {
      name: "DMW",
      classId: "abcd",
      TeacherName: "abc",
    },
    {
      name: "DMW",
      classId: "abcd",
      TeacherName: "abc",
    },
    {
      name: "DMW",
      classId: "abcd",
      TeacherName: "abc",
    },
    {
      name: "DMW",
      classId: "abcd",
      TeacherName: "abc",
    },
  ];

  const getClassList = async () => {
    try {
      const res = await getLiveClassList();
      
      if (res.success === true) {
        console.log("dff ",res.classList)
        setClassList(res.classList);

  
      }
    } catch (error) {
      console.log("Error while getting class list ", error.message);
    }
  };

  useEffect(() => {
    getClassList();
  }, []);

  const handleJoin = async (classId) => {
    navigate(`/room/${classId}`);
    // console.log(classId);
    // const res = await joinLiveClass(classId);
    // const classID = res.classRoomId;

    // if(classID){
    // }

    // console.log("this is res in joinclass -->", res);

    // if(res){
    //   toast.success("Class Joined Successfull!!  ")
    // }
  };

  return (
    <div>
      <div>
        <div>
          <table
            style={{
              width: "75vw",
              border: "1px solid black",
              borderRadius: "25px",
            }}
          >
            <thead style={{ margin: "20px", borderRadius: "20px" }}>
              <tr>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Class ID</th>
                <th style={{ padding: "10px" }}>Teacher Name</th>
                <th style={{ padding: "10px" }}>Join Now</th>
              </tr>
            </thead>


            <tbody style={{margin:"2vh",padding:"2vh"}} >
              {classList.map((item, index) => (
                <tr key={index} style={{borderRadius:"20px",margin:"2vh"}}>
                  <td style={{padding:"10px"}}>{item.subjectId.subjectName}</td>
                  <td style={{padding:"10px"}}>{item.classId.className}</td>
                  <td style={{padding:"10px"}}>{item.teacherId.firstName}</td>
                  <td style={{padding:"10px"}}>
                    <Button className='btn' onClick={()=>handleJoin(item.teacherId._id)} variant='contained' color='success'>
                      Join Class

                    </Button>
                  </td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default JoinClass;
