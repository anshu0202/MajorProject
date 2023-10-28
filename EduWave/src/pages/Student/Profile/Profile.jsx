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
      <div className="profile-info">
          <p style={{textAlign:"center"}}>The IK Gujral Punjab Technical University</p>
          <hr />
        </div>
        <div className="profile-photo">
          <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="Profile" />
          {/* <br /> */}
          <AddCircleOutlineIcon className='profile-icon' fontSize='large'/>
          <h2>Seea Rani</h2>
        </div>

      </div>
      
      <div className="profile-details">
          
          <h3 className='fw-bold'>Student Information</h3>

          <Row style={{margin: "0 auto",width: "70%"}}>
          <hr />
            <Col className='fs-5 m-2'>
            <strong >Name :</strong>
            </Col>
            <Col className='fs-5 m-2'> Seea Rani</Col>
            <hr />
          </Row>
          
          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >Phone No :</strong>
            </Col>
            <Col className='fs-5 m-2'> 9915667484</Col>
            <hr />
          </Row>

          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >Roll No. :</strong>
            </Col>
            <Col className='fs-5 m-2'> 2022614</Col>
            <hr />
          </Row>

          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >Email :</strong>
            </Col>
            <Col className='fs-5 m-2'>seeagarg0203@gmail.com</Col>
            <hr />
          </Row>

          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >Gender :</strong>
            </Col>
            <Col className='fs-5 m-2'>Female</Col>
            <hr />
          </Row>

          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >DOB :</strong>
            </Col>
            <Col className='fs-5 m-2'> 02-02-03</Col>
            <hr />
          </Row>

          <Row style={{margin: "0 auto",width: "70%"}}>
            <Col className='fs-5 m-2'>
            <strong >Address :</strong>
            </Col>
            <Col className='fs-5 m-2'> Jalandhar</Col>
            <hr />
          </Row>

          {/* </div> */}
          
          
          
          <div >
          <h3 className='fw-bold'>Course List</h3>
          <ul style={{width:"70%",margin:"0 auto",display:"flex",flexWrap:"wrap",flexDirection: "column",height: "120px"}}>
          {courses.map((course, index) => (
            <li key={index} className='fs-5 mx-5'>{course}</li>
          ))}
        </ul>
        </div>
          
          
          
        {/* </Row> */}
        
      </div>
     

      <Row className='row' style={{width:"80%",alignItems:"center",alignContent:"center"}}>
        <Col className='col'><Link to="/studentDashboard/UpdateProfile">
        <Button className='btn btn-profile' >Update Profile</Button>
        </Link>
        </Col>
        <Col  className='col'>
        <Link to="/studentDashboard/Grades">
         <Button className='btn btn-profile' >My Progress</Button>
         </Link>
         </Col>

        <Col  className='col'><Link to="/studentDashboard/Assignment">
        <Button className='btn btn-profile'  >My Assignments</Button>
        </Link></Col>
      </Row>
      
    </div>
  );
};

export default Profile;
