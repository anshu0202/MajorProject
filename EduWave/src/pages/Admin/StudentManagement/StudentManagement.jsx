import React from 'react'
import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudentManagement() {

  const Student = [
    {
      name: 'Priya',
      course: 'DMW',
      previousScore: 'abc',
      
    },
    {
      name: 'Priya',
      course: 'DMW',
      previousScore: 'abc',
    },
    {
      name: 'Priya',
      course: 'DMW',
      previousScore: 'abc',
    },
    {
      name: 'Priya',
      course: 'DMW',
      previousScore: 'abc',
    },
    {
      name: 'Priya',
      course: 'DMW',
      previousScore: 'abc',
    },
  ];

    let title = useParams();
  return (
    <div>
    <div style={{border:"1px solid black"}}>
    <Row style={{marginTop:"8rem",margin:"8rem auto",width:"70%"}}>
        {
        Student.map((Student,i) => {
          return(
            <>

              <Col sm md key={i} className="note-card"  style={{padding:"0%",}}>
              
              
              <div className="note-card-subject" >

              <h1>{Student.course}</h1>
              </div>
              <div className="note-card-content">
                {/* <div className="note-card-content-1">
                  <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
                </div> */}
                <div className="note-card-content-2">
                
                  <h2>Name : {Student.name}</h2>
                  
                  <h3>Previous Score:{Student.previousScore}</h3>
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
  )
}

export default StudentManagement
