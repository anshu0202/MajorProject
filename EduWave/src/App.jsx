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
import Profile from './pages/Student/Profile/Profile';
import UpdateProfile from './pages/Student/UpdateProfile/UpdateProfile';
import SideBarTeacher from './pages/Teacher/SideBarTeacher';
import CreateTest from './pages/Teacher/Test/CreateTest';
import UploadAssignment from './pages/Teacher/Assignments/UploadAssignment';
import NoteUpload from './pages/Teacher/Assignments/NoteUpload';
import PyqUpload from './pages/Teacher/Assignments/PyqUpload';
import TeacherHome from './pages/Teacher/TeacherHome';
import AssignmentUpload from './pages/Teacher/Assignments/AssignmentUpload';
import Previous from './pages/Student/PYQS/Previous';
import SideBarAdmin from './pages/Admin/SideBarAdmin';
import TeacherManagement from './pages/Admin/TeacherManage/TeacherManagement';
import StudentManagement from './pages/Admin/StudentManagement/StudentManagement';
import CreateCourse from './pages/Admin/Schedule/CreateCourse';
import CreateSubjects from './pages/Admin/Assignments/CreateSubjects';
import AssignTeachers from './pages/Admin/Test/AssignTeachers';
import ClassManagement from './pages/Admin/ClassManagement/ClassManagement';
import ClassAllocation from './pages/Admin/ClassAllocation/ClassAllocation';
import TeacherClasses from './pages/Teacher/TeacherClasses/TeacherClasses';
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
        <Route path="Previous" element={<Previous/>}/>

        <Route path="Test" element={<Test/>}/>
        <Route path="Schedule" element={<Schedule/>}/>
        <Route path="HelpAndSupport" element={<Help/>}/>
        <Route path="Grades" element={<Grades/>}/>
        <Route path="Announcements" element={<Announcements/>}/>
        <Route path="JoinClass" element={<JoinClass/>}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="UpdateProfile" element={<UpdateProfile/>}/>
        </Route>



        <Route path="/teacherDashboard" element={<SideBarTeacher/>}>
        <Route index element={<TeacherHome/>} />
        {/* <Route path='home' element={<Course/>} /> */}
        <Route path='Courses' element={<Course/>} />


        <Route path="Assignment" element={<UploadAssignment/>}/>
        <Route path="assignmentUpload" element={<AssignmentUpload/>}/>
        <Route path="noteUpload" element={<NoteUpload/>}/>
        <Route path="pyqUpload" element={<PyqUpload/>}/>
        <Route path="Attendance" element={<Attendance/>}/>
        <Route path="Notes" element={<Notes/>}/>
        <Route path="Test" element={<CreateTest/>}/>
        <Route path="Schedule" element={<Schedule/>}/>
        <Route path="HelpAndSupport" element={<Help/>}/>
        <Route path="Grades" element={<Grades/>}/>
        <Route path="Announcements" element={<Announcements/>}/>
        <Route path="JoinClass" element={<LiveClass/>}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="UpdateProfile" element={<UpdateProfile/>}/>
        <Route path="classes" element={<TeacherClasses/>}/>




        </Route>


        <Route path="/adminDashboard" element={<SideBarAdmin/>}>
        <Route index element={<TeacherHome/>} />
        {/* <Route path='home' element={<Course/>} /> */}
        <Route path='studentManagement' element={<StudentManagement/>} />
        <Route path="createSubjects" element={<CreateSubjects/>}/>
        <Route path="assignmentUpload" element={<AssignmentUpload/>}/>
        <Route path="noteUpload" element={<NoteUpload/>}/>
        <Route path="pyqUpload" element={<PyqUpload/>}/>
        <Route path="createCourse" element={<CreateCourse/>}/>
        <Route path="Notes" element={<Notes/>}/>
        <Route path="assignTeachers" element={<AssignTeachers/>}/>
        <Route path="Schedule" element={<Schedule/>}/>
        <Route path="HelpAndSupport" element={<Help/>}/>
        <Route path="Grades" element={<Grades/>}/>
        <Route path="Announcements" element={<Announcements/>}/>
        <Route path="teacherManagement" element={<TeacherManagement/>}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="UpdateProfile" element={<UpdateProfile/>}/>
        <Route path="classManagement" element={<ClassManagement/>}/>
        <Route path="classAllocation" element={<ClassAllocation/>}/>







        </Route>

        <Route path="/liveClass" element={<LiveClass/>}/>

        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<NotFound />} />


        


      </Routes>
    </>
  )
}
export default App
