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
// import Testingpage from './pages/Testingpage';


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room/>} />
        <Route path="/room/:roomID" element={<RoomPage/>} />
        {/* <Route path="/testing" element={<Testingpage/>} /> */}





        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />


        


      </Routes>
    </>
  )
}
export default App
