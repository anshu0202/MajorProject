// import React from 'react'
// import { useParams } from 'react-router-dom'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function StudentManagement() {

//   const Student = [
//     {
//       name: 'Priya',
//       course: 'DMW',
//       previousScore: 'abc',
      
//     },
//     {
//       name: 'Priya',
//       course: 'DMW',
//       previousScore: 'abc',
//     },
//     {
//       name: 'Priya',
//       course: 'DMW',
//       previousScore: 'abc',
//     },
//     {
//       name: 'Priya',
//       course: 'DMW',
//       previousScore: 'abc',
//     },
//     {
//       name: 'Priya',
//       course: 'DMW',
//       previousScore: 'abc',
//     },
//   ];

//     let title = useParams();
//   return (
//     <div>
//     <div style={{border:"1px solid black"}}>
//     <Row style={{marginTop:"8rem",margin:"8rem auto",width:"70%"}}>
//         {
//         Student.map((Student,i) => {
//           return(
//             <>

//               <Col sm md key={i} className="note-card"  style={{padding:"0%",}}>
              
              
//               <div className="note-card-subject" >

//               <h1>{Student.course}</h1>
//               </div>
//               <div className="note-card-content">
//                 {/* <div className="note-card-content-1">
//                   <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
//                 </div> */}
//                 <div className="note-card-content-2">
                
//                   <h2>Name : {Student.name}</h2>
                  
//                   <h3>Previous Score:{Student.previousScore}</h3>
//                   {/* <h4>{searchResult.fileType}</h4> */}
//                   <div className="display-flex">
//                   <a style={{textDecoration:"none"}} target='_blank' >
//                   <button>Approve</button>
//                   </a>
//                   <a style={{textDecoration:"none" , marginTop:"1rem"}} target='_blank' >
//                   <button>Delete</button>
//                   </a>
//                   </div>
                  
//                 </div>
//               </div>
              
              
//               </Col>
//             </>
//         )} )
//          }
//       </Row>
//     </div>
//   </div>
//   )
// }

// export default StudentManagement


import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { joinLiveClass } from '../../../service/StudentApi';
import { useNavigate } from 'react-router';
import LoadingAnimation from '../../Student/Assignments/LoadingAnimation'
// import './JoinClass.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from 'react-toastify';
import { deleteStudentReq, getAllStudentList, getAllStudentReqList, getAllTeacherList, getAllTeachersReqList, studentApproval, teacherApproval } from '../../../service/AdminApi';

function StudentManagement() {

  const [studentReqList, setStudentReqList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const getAllStudentReqLis = async () => {
    try {

      const res = await getAllStudentReqList();
      // console.log("this is getting All Teachers data-->", res?.data?.data);
      setStudentReqList(res?.data?.data);

    } catch (error) {
      console.log("Erro in getting data in frontEnd --> ", error);
    }
  }

  const getAllStudentLis = async () => {
    try {

      const res = await getAllStudentList();
      setStudentList(res?.data);

    } catch (error) {
      console.log("Erro in getting data in frontEnd --> ", error);
    }
  }

  const handleApprove = async (data) => {
    try {

      const id = data._id;
      // console.log("this is di -- >" , id);


      const res = await studentApproval(id);
      // console.log("this is di -- >" , res);
      if(res?.success){
        toast.success(res?.message);
        getAllStudentLis();
        getAllStudentReqLis();
      }
      
    } catch (error) {
        console.log("Erro in While Approving Teacher --> ", error);
        toast.error(error.message);
    }

  }

  const handleDeletion = async (data) => {
    try {

      const shouldDelete = window.confirm("Are you sure you want to delete?");

        if (!shouldDelete) {
            // If the user cancels the deletion
            return;
        }

      const id = data._id;
      // console.log("this is di -- >" , id);


      const res = await deleteStudentReq(id);
      // console.log("this is di -- >" , res);
      if(res?.success){
        toast.success(res?.message);
        getAllStudentLis();
        getAllStudentReqLis();
      }
      
    } catch (error) {
        console.log("Erro in While Approving Teacher --> ", error);
        toast.error(error.message);
    }

  }



  useEffect(() => {
    getAllStudentLis();

    getAllStudentReqLis();
  }, []);



  return (
    <>
      <div className="container">
        <Row className="justify-content-center p-3">
          <Col md={6}>
            <h1 className="text-center">All Student List </h1>

            <div className="border shadow">
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th className='text-center' scope='col'>No</th>
                                    <th className='text-center'  scope='col'>First name</th>
                                    <th className='text-center' scope='col'>Last Name</th>
                                    <th className='text-center' scope='col'>Email</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  studentList?.map((u, i) => (
                                        <>
                                            <tr>
                                                <td className='text-center'>{i + 1}</td>
                                                <td className='text-center'>{u?.firstName}</td>

                                                <td className='text-center'>{u?.lastName}
                                                </td>
                                                <td className='text-center'>{u?.email}</td>
                                               
                                            </tr>
                                        </>


                                    ))
                                }

                            </tbody>

                        </table>
                    </div>





          </Col>
          <Col md={6}>
            <h1 className="text-center">New Students Request List </h1>

            <div className="border shadow">
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th className='text-center' scope='col'>No</th>
                                    <th className='text-center'  scope='col'>First name</th>
                                    <th className='text-center' scope='col'>Last Name</th>
                                    <th className='text-center' scope='col'>Email</th>
                                    <th className='text-center' scope='col'>Approve</th>
                                    <th className='text-center' scope='col'>Reject</th>



                                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  studentReqList?.map((u, i) => (
                                        <>
                                            <tr>
                                                <td className='text-center'>{i + 1}</td>
                                                <td className='text-center'>{u?.fname}</td>

                                                <td className='text-center'>{u?.lname}
                                                </td>
                                                <td className='text-center'>{u?.email}</td>
                                                <td className='text-center'><Button variant='contained' color='success' onClick={() => handleApprove(u)}  >Approve</Button></td>
                                                <td className='text-center'><Button variant='contained' color='error' onClick={() => handleDeletion(u)}  >Reject</Button></td>
                                            </tr>
                                        </>


                                    ))
                                }

                            </tbody>

                        </table>
                    </div>


          </Col>


        </Row>

        <ToastContainer />
      </div>
    </>
  );
}

export default StudentManagement;
