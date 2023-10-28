import React from 'react'
import { useParams } from 'react-router-dom';
import LoadingAnimation from "../Assignments/LoadingAnimation";
// import Navbar from './Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import '../../Teacher/Assignments/note.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Course.css'


function Course() {

  const searchResult=[
    { course:"DMW",
      teacher:"Priya Sachdeva",
    },
    {
      course:"DMW",
      teacher:"Priya Sachdeva"
    },
   { 
    course:"DMW",
    teacher:"Priya Sachdeva"
   },
   {
    course:"DMW",
    teacher:"Priya Sachdeva"
   }


  ]

    let title = useParams();
  return (
    <div>
     <div className="note" style={{textAlign:"center"}}>
        <div className="note-intro" style={{padding:"0%",position:"relative"}}>

        
          <div className="note-select">
            <select value="1" onChange={(e) => option(e)} name="" id="">
              <option className='note-option'>filter</option>
              <option className='note-option'>chapter</option>
              <option className='note-option'>subject</option>

            </select>

          </div>
          <div className="note-search">
            {/* <input value={searchBarValue} onChange={(e) => searchBar(e.target.value)} className='note-search-bar' type="text" placeholder='Search note' onBlur={() => {
              setTimeout(() => {
                setSuggestion([])
              }, 200)
            }} /> */}
            {/* <i onClick={search} class="fa-solid fa-magnifying-glass"></i> */}
            {/* {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="note-search-suggestion">
                  {suggestion}
                </div>
              );
            })} */}
          </div>
          
        </div>


        <Row style={{marginTop:"8rem",width:"90%",margin:"8rem auto"}}>
          {/* {loaderAnimation ? searchResult &&  */}
          {searchResult.map((searchResult, i) => {
            {/* let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view` */}
            return (
              <>

                <Col sm md key={i} className="note-card" style={{padding:"0%"}}>
                <div className="note-card-subject">

                <h1>{searchResult.teacher}</h1>
                </div>
                <div className="note-card-content">
                  <div className="note-card-content-1">
                    <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
                  </div>
                  <div className="note-card-content-2">
                  
                    <h2>credit : {searchResult.credit}</h2>
                    <h3>{searchResult.course}</h3>
                    <a style={{textDecoration:"none"}} target='_blank' href=  {searchResult?.filePath?.webContentLink}>
                    <button className='btn'>Notes</button>
                    </a>
                    <a style={{textDecoration:"none" , marginTop:"1rem"}} target='_blank' href=  {searchResult?.filePath?.webViewLink}>
                    <button className='btn' >Assignments</button>
                    </a>
                  </div>
                </div>
                <div className="note-card-credit">
                  <h1>{searchResult.chapter}</h1>
                </div>
                  
                </Col>
              </>
            )
          }) }

          {/* :<LoadingAnimation/>  */}
        </Row>
        

      </div>

    </div>
  )
}

export default Course
