import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { joinLiveClass } from '../../../service/StudentApi';
import { useNavigate } from 'react-router';
import LoadingAnimation from '../../Student/Assignments/LoadingAnimation'
import './JoinClass.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from 'react-toastify';
import { deleteTeacherReq, getAllTeacherList, getAllTeachersReqList, teacherApproval } from '../../../service/AdminApi';

function TeacherManagement() {

  const [teacherReqList, setTeacherReqList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const getAllTeachersReqLis = async () => {
    try {

      const res = await getAllTeachersReqList();
      // console.log("this is getting All Teachers data-->", res?.data?.data);
      setTeacherReqList(res?.data?.data);

    } catch (error) {
      console.log("Erro in getting data in frontEnd --> ", error);
    }
  }

  const getAllTeachersLis = async () => {
    try {

      const res = await getAllTeacherList();
      setTeacherList(res?.data);

    } catch (error) {
      console.log("Erro in getting data in frontEnd --> ", error);
    }
  }

  const handleApprove = async (data) => {
    try {

      const id = data._id;
      console.log("this is di -- >" , id);


      const res = await teacherApproval(id);
      console.log("this is di -- >" , res);
      if(res?.success){
        toast.success(res?.message);
        getAllTeachersLis();
        getAllTeachersReqLis();
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


      const res = await deleteTeacherReq(id);
      // console.log("this is di -- >" , res);
      if(res?.success){
        toast.success(res?.message);
        getAllTeachersLis();
        getAllTeachersReqLis();
      }
      
    } catch (error) {
        console.log("Erro in While Approving Teacher --> ", error);
        toast.error(error.message);
    }

  }



  useEffect(() => {
    getAllTeachersLis();
    getAllTeachersReqLis();
  }, []);



  return (
    <>
      <div className="container">
        <Row className="justify-content-center p-3">
          <Col md={6}>
            <h1 className="text-center">All Teacher List </h1>

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
                                  teacherList?.map((u, i) => (
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
            <h1 className="text-center">New Teachers Request List </h1>

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
                                  teacherReqList?.map((u, i) => (
                                        <>
                                            <tr>
                                                <td className='text-center'>{i + 1}</td>
                                                <td className='text-center'>{u?.fname}</td>

                                                <td className='text-center'>{u?.lname}
                                                </td>
                                                <td className='text-center'>{u?.email}</td>
                                                <td className='text-center'><Button variant='contained' color='success' onClick={() => handleApprove(u)}  >Approve</Button></td>
                                                <td className='text-center' ><Button variant='contained' color='error' onClick={() => handleDeletion(u)}  >Reject</Button></td>
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

export default TeacherManagement;
