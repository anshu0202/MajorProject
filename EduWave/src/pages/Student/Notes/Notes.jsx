import React, { useState } from 'react'
import { useEffect } from 'react'
import LoadingAnimation from "../Assignments/LoadingAnimation";
// import Navbar from './Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../Teacher/Assignments/note.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Notes() {
  const [serverValue, setServerValue] = useState([])
  const [optionValue, setOptionValue] = useState('')
  const [searchBarValue, setSearchBarValue] = useState('')
  const [searchKeyValueSuggestion, setSearchKeyValueSuggestion] = useState([])

  const [suggestion, setSuggestion] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [sortOptionOpen, setSortOptionOpen] = useState(true)
  const [loaderAnimation , setLoaderAnimation] =useState(false)
  const [sortValue,setSortValue ] = useState('MID Term')
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadOption = async () => {
      // const pyqServerData = await fetch('https://exampedia-rest-api-production.up.railway.app/api/allNote');

      const pyqServerData = await fetch(`${url}/api/v1/teacher/getAllAssignment`);
      let pyqServerValue = await pyqServerData.json();
      console.log("thisb is all data --->" , pyqServerValue);
      setServerValue(pyqServerValue.data);
      // console.log(serverValue);
      // setServerValue(pyqServerValue)

      if (optionValue == "subject") {
        const pyqSubjectOptionData = serverValue.map((obj) => {

          return obj.subject;
        })

        // console.log(pyqSubjectOptionData);

        const filteredPyqSubjectOptionData = pyqSubjectOptionData.filter((val, index) => pyqSubjectOptionData.indexOf(val) == index);

        // console.log(filteredPyqSubjectOptionData);
        setSearchKeyValueSuggestion(filteredPyqSubjectOptionData)
        setServerValue(pyqServerValue);
      }
      if (optionValue === "chapter") {
        const pyqFacultyOptionData = serverValue.map((obj) => {

          return obj.chapter;
        })

        // console.log(pyqFacultyOptionData);

        const filteredPyqFacultyOptionData = pyqFacultyOptionData.filter((val, index) => pyqFacultyOptionData.indexOf(val) == index);

        // console.log(filteredPyqFacultyOptionData);
        setSearchKeyValueSuggestion(filteredPyqFacultyOptionData);
      }




    }
    loadOption()
    search()

  }, [optionValue,searchBarValue])



  const option = (e) => {
    setOptionValue(e.target.value);
    // console.log(e.target.value);
  }

  const sort = (e) =>{
    if(e.target.value === 'Sort'){
      setSortValue('');
    }else{

      setSortValue(e.target.value);
      console.log(e.target.value);
    }
    // console.log(sortValue);
    search()
    
  }

  const searchBar = (searchKeyword) => {
    // setSearchBarValue(e.target.value);
    // console.log(e.target.value);
    
    let searchMatch = [];
    if (searchKeyword.length > 0) {
      searchMatch = searchKeyValueSuggestion.filter(ele => {
        let regex = new RegExp(searchKeyword, "gi");
        return ele.match(regex);
      })
    }
    // console.log(searchMatch);
    setSuggestion(searchMatch)
    setSearchBarValue(searchKeyword)
  }
  const onSuggestionHandler = (subjectSearched) => {
    setSearchBarValue(subjectSearched)
    setSuggestion([]);

  }



  const search = async () => {
    if(searchBarValue.length > 0){

    }
    // alert(`${searchBarValue} is searched`)
    // console.log(`https://exampedia-rest-api-production.up.railway.app/api/allNote?${optionValue}=${searchBarValue} is searched`);
    const searchedData = await fetch(`${url}/api/v1/teacher/getAllNotes`);
    const searchValue = await searchedData.json();
    console.log("loda lasun -->" , searchValue);
    setSearchResult(searchValue.data);
    setLoaderAnimation(true);

  }




  return (


    <>
      {/* <Navbar /> */}
      <div className="note" style={{textAlign:"center"}}>
        <div className="note-intro" style={{padding:"0%",position:"relative"}}>

        
          <div className="note-select">
            <select value={optionValue} onChange={(e) => option(e)} name="" id="">
              <option className='note-option'>filter</option>
              <option className='note-option'>chapter</option>
              <option className='note-option'>subject</option>

            </select>

          </div>
          <div className="note-search">
            <input value={searchBarValue} onChange={(e) => searchBar(e.target.value)} className='note-search-bar' type="text" placeholder='Search note' onBlur={() => {
              setTimeout(() => {
                setSuggestion([])
              }, 200)
            }} />
            <i onClick={search} class="fa-solid fa-magnifying-glass"></i>
            {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="note-search-suggestion">
                  {suggestion}
                </div>
              );
            })}
          </div>
          
        </div>

        {/* <Row>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row> */}


        <Row style={{marginTop:"8rem",width:"90%",margin:"8rem auto"}}>
          {loaderAnimation ? searchResult && searchResult.map((searchResult, i) => {
            let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view`
            return (
              <>

                <Col sm md key={i} className="note-card" style={{padding:"0%"}}>
                <div className="note-card-subject">

                <h1>{searchResult.subject}</h1>
                </div>
                <div className="note-card-content">
                  <div className="note-card-content-1">
                    <img src="https://i.postimg.cc/fbvjMqxy/image-removebg-preview-4.png" alt="" srcset="" />
                  </div>
                  <div className="note-card-content-2">
                  
                    <h2>credit : {searchResult.credit}</h2>
                    <h3>{searchResult.fileSize}</h3>
                    <h4>{searchResult.fileType}</h4>
                    <a style={{textDecoration:"none"}} target='_blank' href=  {searchResult?.filePath?.webContentLink}>
                    <button>Download</button>
                    </a>
                    <a style={{textDecoration:"none" , marginTop:"1rem"}} target='_blank' href=  {searchResult?.filePath?.webViewLink}>
                    <button>View</button>
                    </a>
                  </div>
                </div>
                <div className="note-card-credit">
                  <h1>{searchResult.chapter}</h1>
                </div>
                  
                </Col>
              </>
            )
          }) :<LoadingAnimation/> }
        </Row>
        

      </div>


    </>
  )
}

export default Notes
