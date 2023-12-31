import React from 'react';
import './Profile.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Profile = ({ user }) => {

  const courses=[
    "DMW","Agile","Software Engineering","System Design","OOPS","DSA","React Js"
  ]

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="Profile" />
          {/* <br /> */}
          <AddCircleOutlineIcon className='icon' fontSize='large'/>
          <h2>Seea Rani</h2>
        </div>
        <div className="profile-info">
          <p style={{textAlign:"center"}}>The IK Gujral Punjab Technical University</p>
        </div>
      
      <div className="profile-courses">
        <h3>Courses</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>

      </div>
      {/* <hr style={{color:"grey"}}/> */}
      <div className="profile-details">
        <h3>Student Information</h3>
        <Row>
          <Col className='profile-details-col' >
          <strong className='fs-4 m-3'>Name :</strong> <span className='fs-4 '>Seea Rani</span>
          </Col>
          <Col className='profile-details-col'>
          <strong className='fs-4 m-3'>Phone No :</strong> <span className='fs-4'>9915667484</span>
          </Col>
        </Row>
        <Row>
          <Col className='profile-details-col'>
          <strong className='fs-4 m-3'>Roll No. :</strong> <span className='fs-4'>2022614</span>
          </Col>
          <Col className='profile-details-col'>
          <strong className='fs-4 m-3'>Email :</strong> <span className='fs-4'>seeagarg0203@gmail.com</span>
          </Col>
        </Row>
        <Row>
          <Col className='profile-details-col'>
          <strong className='fs-4  m-3'>Gender :</strong> <span className='fs-4'>Female</span>
          </Col>
          <Col className='profile-details-col'>
          <strong className='fs-4  m-3'>DOB :</strong> <span className='fs-4'>02-02-03</span>
          </Col>
        </Row>
        <Row>
          <Col className='profile-details-col'>
          <strong className='fs-4  m-3'>Address :</strong> <span className='fs-4'>Jalandhar</span>
          </Col>
          
        </Row>
      </div>
     

      <Row className='row' style={{width:"80%",alignItems:"center",alignContent:"center"}}>
        <Col className='col'><Link to="/studentDashboard/UpdateProfile">
        <Button className='btn' variant="info" style={{width:"100%"}}>Update Profile</Button>
        </Link>
        </Col>
        <Col  className='col'>
        <Link to="/studentDashboard/Grades">
         <Button className='btn' variant="info" style={{width:"100%"}}>My Progress</Button>
         </Link>
         </Col>

        <Col  className='col'><Link to="/studentDashboard/Assignment">
        <Button className='btn' variant="info" style={{width:"100%"}}>My Assignments</Button>
        </Link></Col>
      </Row>
      
    </div>
  );
};

export default Profile;
