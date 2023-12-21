import React, { useEffect, useState, useRef } from 'react'
// import Navbar from './Navbar';
// import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import "./pyq.css";
import "./pyqMedia.css";
import "./upload.css";
import "./note.css";
import "./media.css";
import { uploadAssignment, uploadNotes } from '../../../service/TeacherApi';
import { toast , ToastContainer } from 'react-toastify';

function AssignmentUpload() {

  const [background, setBackground] = useState()
  const [color, setColor] = useState()
  const [toggle, setToggle] = useState(false)
  const [notesOn, setNotesON] = useState(false)
  const [pyqOn, setPyqON] = useState(true)
  const [para, setPara] = useState("flex")
  const [notesCard, setNotesCard] = useState("none")
  const [pyqCard, setPyqCard] = useState("none")
  const [subject, setSubject] = useState([])
  const [subjectSuggestion, setSubjectSuggestion] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [file, setFile] = useState([])
  const [credit, setCredit] = useState('')
  const [chapter,setChapter] = useState('')
  const [notesData, setNotesData] = useState()
  const [noteProgress, setNoteProgress] = useState(0)
  const [notesMsg, setNotesMsg] = useState('')
  const [formData,setFormData]=('not-allowed');
  const [subjectName , setSubjectName] = useState('');
  const [className , setClassName] = useState('');


  const auth = JSON.parse(localStorage.getItem('auth'));
  // setCredit(auth.firstName)

  // console.log("auth is ",auth.firstName);

  useEffect(() => {
     setCredit(auth.firstName)
     

    const loadSubject = async () => {
      const subjectNoteFetch = await fetch('https://exampedia-rest-api.onrender.com/api/allNote')
      const subjectNoteData = await subjectNoteFetch.json()
      let myNoteSubjectData = subjectNoteData.map((obj) => {
        return obj.subject
      })
      const filteredSuggestion = myNoteSubjectData.filter((val, index) => myNoteSubjectData.indexOf(val) == index);

      // console.log(filteredSuggestion)
      // console.log(myNoteSubjectData);
      setSubject(filteredSuggestion)

      if(file && credit && suggestion ){
        // setFormData('')
      }


    }
    loadSubject();

  }, [])

  const onSuggestionHandler = (subjectSearched) => {
    setSubjectSuggestion(subjectSearched)
    setSuggestion([]);

  }



  const onChangeHandler = (subjectSearched) => {


    let subjectMatches = []
    if (subjectSearched.length > 0) {
      subjectMatches = subject.filter(ele => {
        let regex = new RegExp(subjectSearched, "gi");

        return ele.match(regex);
      })
    }
    // console.log(subjectMatches);

    setSuggestion(subjectMatches)

    // console.log(subjectSearched);
    setSubjectSuggestion(subjectSearched)
  }

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };


  const pyqButtonON = () => {
    console.log("pyq accesed");
    setPyqON(true)
    setBackground("")
    setPara("none")
    setColor("")
    setNotesON(false)
    setNotesCard("none")
    setPyqCard("flex")
  }
  const notesButtonON = () => {
    console.log("notes accesed");
    setPyqON(false)
    setNotesON(true)
    setPara("none")
    setPyqCard("none")
    setNotesCard("flex")

  }

  const notesFile = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let filePath = e.target.files[0];
    setFile(filePath)



  }
  const creditName = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let creditname = e.target.value;
    setCredit(creditname)

  }
  const chapterName = (e) => {
    setNoteProgress(0)
    setNotesMsg('');
    let chaptername = e.target.value;
    setChapter(chaptername)
    // console.log(chapter);

  }
  

  const notesUpload = async (e) => {
    setNoteProgress(0)
    e.preventDefault()
    // console.log(subjectSuggestion)
    // console.log(file);
    // console.log(credit);
    // console.log(chapter);
    // console.log(subjectName);
    // console.log(className);
    // {subjectSuggestion && file && credit}
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('credit', credit);
    formdata.append('chapter', chapter);
    formdata.append('subject', subjectName);
    formdata.append('className', className);

      const res = await uploadAssignment(formdata);
      if(res.success===true){
        toast.success("File uploaded successfully");
        setFile([]);
        setCredit('');
        setChapter('');
        setClassName('');
        setSubjectName('')

      }
      else{
        toast.error("Error while File uploading");
      }


  }

  const noteUploadOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setNoteProgress(percentage);
    }
  }



  return (
    <>
      
      <div className="upload">
        <div className='m-2' >
            <button style={{width:"14rem"}}    className='btn upload-menu-notes m-2 btn-profile  '>Assignment Upload</button>
        </div>
      <div className="upload">
        <div  className="upload-notes">
          <form onSubmit={(e) => notesUpload(e)} className='notes-upload-form' >

            <label className='select-notes-container' for="Select Notes">
              <img src="https://i.postimg.cc/fLbNF8mc/ezgif-com-gif-maker-3.gif" alt="" srcset="" />
              <p>doc allowed but recommended Pdf file</p>
              <div className="select-notes-button">


                <input ref={ref} className='select-files' type="file" name="notes" id="Select Notes" required accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => notesFile(e)} />


              </div>
            </label>

            <input className='note-text-input' value={credit} placeholder='Enter Your Name' required type="text" name="credit" id="" onChange={(e) => creditName(e)} />
            <input className='note-text-input' value={chapter} placeholder='Enter Unit/Topic Name ' required type="text" name="credit" id="" onChange={(e) => chapterName(e)} />
            <input className='note-text-input' value={className} onChange={(e) => setClassName(e.target.value)} placeholder='Enter Class name' required type="text" name="class"  />

            <input className='note-text-input' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder='Enter subject name' required type="text" name="subject"  />

           

            {suggestion && suggestion.map((suggestion, i) => {

              return (
                <div key={i} onClick={() => onSuggestionHandler(suggestion)} className="suggestion">
                  {suggestion}
                </div>
              );
            })}

            <div className="note-submit">
              <button className='btn' type='submit'  name="Upload" id="" >Upload</button>



            </div>

            <CircularProgressbar className='note-circular-progress'
              value={noteProgress}
              text={`${noteProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'butt',
                textSize: '20px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(29, 15, 74, 1, ${noteProgress / 100})`,
                textColor: 'rgba(29, 15, 74, 1)',
                trailColor: 'rgba(182, 51, 118, 1)',
                backgroundColor: 'rgba(29, 15, 74, 1)',
              })}
            />
            <h1 className="note-submit-message" >{notesMsg}</h1>


          </form>
        </div>
        
      </div>






      </div>
      {/* <Footer/> */}

      <ToastContainer/>
    </>
  )
}

export default AssignmentUpload
