// import React from 'react'
// import NotesCard from './NotesCard'

// function Notes() {
//   return (
//     <div>
//       This is Notes Page 
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium iusto perspiciatis dolorum aperiam dignissimos esse obcaecati minus non tempora optio qui pariatur quo nobis quae debitis dolorem vel expedita accusamus fuga deserunt, quos error est aspernatur! Et quod aperiam quam tenetur porro beatae iusto tempora distinctio debitis, natus non quae quos ullam eligendi quia deleniti doloremque eius amet error.

//       <NotesCard subject="DMW"/>
//       <NotesCard subject="Maths"/>
//       <NotesCard subject="English"/>
//     </div>
//   )
// }

// export default Notes




// import React from 'react'
// import { useParams } from 'react-router-dom';

// function Assignment() {
//     let title = useParams();
//   return (
//     <div>

//         <h1>All Assignment </h1>


//     </div>
//   )
// }

// export default Assignment


import React, { useState } from 'react'
import { useEffect } from 'react'
import LoadingAnimation from "../Assignments/LoadingAnimation";
// import Navbar from './Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Previous() {
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
    const searchedData = await fetch(`${url}/api/v1/teacher/getAllPyqs`);
    const searchValue = await searchedData.json();
    console.log("loda lasun -->" , searchValue);
    setSearchResult(searchValue.data);
    setLoaderAnimation(true);
    

  }




  return (


    <>
      {/* <Navbar /> */}
      <div className="note">
        <div className="note-intro">
        
        
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

        <div className="note-card-row">
          {loaderAnimation ? searchResult && searchResult.map((searchResult, i) => {
            let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view`
            return (
              <>

                <div key={i} className="note-card">
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
                  
                </div>
              </>
            )
          }) :<LoadingAnimation/> }
        </div>
        

      </div>


    </>
  )
}

export default Previous
