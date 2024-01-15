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
import LoadingAnimation from './LoadingAnimation'
// import Navbar from './Navbar'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Notes() {
  const [serverValue, setServerValue] = useState([])
  const [optionValue, setOptionValue] = useState('')
  const [searchBarValue, setSearchBarValue] = useState('')
  const [searchKeyValueSuggestion, setSearchKeyValueSuggestion] = useState([])

  const [suggestion, setSuggestion] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [sortOptionOpen, setSortOptionOpen] = useState(true)
  const [loaderAnimation, setLoaderAnimation] = useState(false)
  const [sortValue, setSortValue] = useState('MID Term')
  const url = import.meta.env.VITE_BACKEND_URL;
  const [ showView ,  setShowView] = useState(false);
  useEffect(() => {
    const loadOption = async () => {
      // const pyqServerData = await fetch('https://exampedia-rest-api-production.up.railway.app/api/allNote');

      const pyqServerData = await fetch(`${url}/api/v1/teacher/getAllAssignment`);
      let pyqServerValue = await pyqServerData.json();
      // console.log("thisb is all data --->" , pyqServerValue);
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

  }, [optionValue, searchBarValue])



  const option = (e) => {
    setOptionValue(e.target.value);
    // console.log(e.target.value);
  }

  const sort = (e) => {
    if (e.target.value === 'Sort') {
      setSortValue('');
    } else {

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
    if (searchBarValue.length > 0) {

    }
    // alert(`${searchBarValue} is searched`)
    // console.log(`https://exampedia-rest-api-production.up.railway.app/api/allNote?${optionValue}=${searchBarValue} is searched`);
    const searchedData = await fetch(`${url}/api/v1/teacher/getAllAssignment`);
    const searchValue = await searchedData.json();
    // console.log("loda lasun -->" , searchValue);
    setSearchResult(searchValue.data);
    setLoaderAnimation(true);


  }



  const validateViewCount = async()=>{

    try {
      console.log("kjvnfsdkjnvskjdf validate")
      const userID = JSON.parse(localStorage.getItem("auth"))?._id;

      const res = await fetch(`${url}/api/v1/teacher/checkUserViewAssignment/${userID}`);

      console.log("this is res -->", res);


      
    } catch (error) {
      console.log(error);
    }




  }

  const handleClickView = async (data) => {
    console.log(" check user already view" , data);



    try {
      const userID = JSON.parse(localStorage.getItem("auth"))?._id;

      const res = await axios.get(`${url}/api/v1/teacher/checkUserViewAssignment/${userID}/${data._id}`);

      console.log("this is res -->", res);

      if(res.data.view==true){

        toast.error("Already viewed");
        setShowView(false);
        return;
      }else{
        toast.success("Viewed successfully");
        setShowView(true);
      }


      
    } catch (error) {
      console.log(error);
    }


      console.log("this is data -->", data);

      



      const id = data._id;
      const userID = JSON.parse(localStorage.getItem("auth"))?._id;
      console.log("This is user ID-->" , userID);
      const res = await fetch(`${url}/api/v1/teacher/increaseCount/${id}`);

      if (res.status === 200) {
        toast.success("Count increased successfully");
        // window.location.reload();
        search();
      }

    






  }


  




  return (


    <>
      {/* <Navbar /> */}
      <div className="note">
        <div className="note-intro" style={{ padding: "0%", position: "relative" }}>
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

        <Row style={{ marginTop: "8rem", width: "90%", margin: "8rem auto" }}>
          {loaderAnimation ? searchResult && searchResult.map((searchResult, i) => {
            let docUrl = `https://drive.google.com/file/d/`;
            let docMethod = `/view`
            return (
              <>

                <Col sm md key={i} className="note-card" style={{ padding: "0%" }}>
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

                      <h4>{searchResult.count}</h4>
                      <a style={{ textDecoration: "none" }} target='_blank' href={searchResult?.filePath?.webContentLink}>
                        <button>Download</button>
                      </a>



                      {
                        showView ==true ? null : 


                        <a 
                      
                      style={{ textDecoration: "none", marginTop: "1rem" }} target='_blank' href={searchResult?.filePath?.webViewLink}>
                        <button onclick={() => handleClickView(searchResult)}>View</button>

                      </a>


                      }

                      <button onClick={() => handleClickView(searchResult)}>Checkkk</button>

                      {/* <button className='mt-2' onClick={() => handleClickView(searchResult)} >Count</button> */}
                      {/* <button onClick={() => handleClickView(searchResult)}>test 111</button> */}
                    </div>
                  </div>
                  <div className="note-card-credit">
                    <h1>{searchResult.chapter}</h1>
                  </div>

                </Col>
              </>
            )
          }) : <LoadingAnimation />}
        </Row>


      </div>

      <ToastContainer />
    </>
  )
}

export default Notes
