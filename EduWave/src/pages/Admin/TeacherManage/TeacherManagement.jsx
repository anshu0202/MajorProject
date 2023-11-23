import { Button } from '@mui/material';
import React from 'react';
import { joinLiveClass } from '../../../service/StudentApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import LoadingAnimation from '../../Student/Assignments/LoadingAnimation'
import './JoinClass.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import '../../Student/Profile/Profile.css'

function TeacherManagement() {

  const navigate = useNavigate();
  const Teacher = [
    {
      name: 'Priya',
      subject: 'DMW',
      Qualification: 'abc',
      resume:".....",
      Experience:"2years"
    },
    {
      name: 'Anshu',
      subject: 'DSA',
      Qualification: 'abc',
      resume:".....",
      Experience:"2years"
    },
    {
      name: 'Laxmikant',
      subject: 'Web Development',
      Qualification: 'abc',
      resume:".....",
      Experience:"2years"
    },
    {
      name: 'Anurag',
      subject: 'Operating system',
      Qualifictaion: 'abc',
      resume:".....",
      Experience:"2years"
    },
    {
      name: 'Seea',
      subject: 'network security',
      Qualification: 'abc',
      resume:".....",
      Experience:"2years"
    },
  ];


  

  return (
    <div>
      <div style={{border:"1px solid black"}}>
      <Row style={{marginTop:"8rem",margin:"8rem auto",width:"70%"}}>
          {
          Teacher.map((Teacher,i) => {
            return(
              <>

                <Col sm md key={i} className="note-card"  style={{padding:"0%",}}>
                
                
                <div className="note-card-subject" >

                <h1>{Teacher.subject}</h1>
                </div>
                <div className="note-card-content">
                  {/* <div className="note-card-content-1">
                    <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
                  </div> */}
                  <div className="note-card-content-2">
                  
                    <h2>Name : {Teacher.name}</h2>
                    <h3>Qualification:{Teacher.Qualification}</h3>
                    <h3>Experience:{Teacher.Experience}</h3>
                    <h3>Resume:{Teacher.resume}</h3>
                    {/* <h4>{searchResult.fileType}</h4> */}
                    <div className="display-flex">
                    <a style={{textDecoration:"none"}} target='_blank' >
                    <button>Approve</button>
                    </a>
                    <a style={{textDecoration:"none" , marginTop:"1rem"}} target='_blank' >
                    <button>Delete</button>
                    </a>
                    </div>
                    
                  </div>
                </div>
                
                
                </Col>
              </>
          )} )
           }
        </Row>
      </div>
    </div>
  );
}

export default TeacherManagement;
