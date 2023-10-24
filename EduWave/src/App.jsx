import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import RoomPage from './pages/RoomPage';
import Dashboard from './pages/Student/Dashboard';
import Course from './pages/Student/Courses/Course';
import Assignment from './pages/Student/Assignments/Assignment';
import SideBar from './pages/Student/SideBar';
import Attendance from './pages/Student/Attendance/Attendance';
import Notes from './pages/Student/Notes/Notes';
import Test from './pages/Student/Test/Test';
import Schedule from './pages/Student/Schedule/Schedule';
import Help from './pages/Student/HelpAndSupport/Help';
import JoinClass from './pages/Student/JoinClass/JoinClass';
import Announcements from './pages/Student/Anouncements/Announcements';
import Grades from './pages/Student/Grades/Grades';
import LiveClass from './pages/Teacher/LiveClass/LiveClass';
// import Testingpage from './pages/Testingpage';


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room/>} />
        <Route path="/room/:roomID" element={<RoomPage/>} />
        <Route path="/liveClass" element={<LiveClass/>} />

        {/* <Route path="/testing" element={<Testingpage/>} /> */}





        <Route path="/about" element={<About />} />
        <Route path="/studentDashboard" element={<SideBar/>}>
        
        <Route index element={<Course/>} />
        <Route path='Courses' element={<Course/>} />

        <Route path="Assignment" element={<Assignment/>}/>
        <Route path="Attendance" element={<Attendance/>}/>
        <Route path="Notes" element={<Notes/>}/>
        <Route path="Test" element={<Test/>}/>
        <Route path="Schedule" element={<Schedule/>}/>
        <Route path="HelpAndSupport" element={<Help/>}/>
        <Route path="Grades" element={<Grades/>}/>
        <Route path="Announcements" element={<Announcements/>}/>
        <Route path="JoinClass" element={<JoinClass/>}/>
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<NotFound />} />


        


      </Routes>
    </>
  )
}
export default App
