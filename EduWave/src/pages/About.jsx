
import React from 'react'
import { NavLink } from 'react-router-dom';
import image from '../assets/img/about.png'
import Navbar from './Home/Navbar';
import Layout from '../components/Layout/Layout';
import Footer from './Home/Footer';
function About() {
  return (
    <>
      {/* <Layout> */}
      <Navbar/>
      <div className="about">
      <h1 className='text-center' style={{color:"white",background:"linear-gradient(303deg, rgba(182, 51, 118, 1) 5%, rgba(29, 15, 74, 1) 57%)"}}>About Education Hub</h1>

      <div className="hero" style={{marginTop:"-10vh"}}>
      {/* <div className="" style={{width:"100vw"}}> */}

      
        <div className="content-1" style={{marginTop:"10%"}}>
          
          <p style={{color:"white",fontSize:"1.3rem"}}>Welcome to our website. Education Hub is Developed and Designed by <b>Team Name</b> Education Hub, Our innovative creation, redefines education through a centralized platform. Students effortlessly enroll in multiple courses, and teachers seamlessly organize, upload notes, and conduct live video lectures for 40-50 students. Administrators maintain control, ensuring a secure and efficient learning environment. The platform's versatility caters to diverse educational needs, offering a comprehensive repository of learning resources. With streamlined processes and a commitment to efficiency, Education Hub transforms traditional learning into a dynamic, interactive experience. Join us in shaping the future of education, where knowledge meets innovation.</p>
        </div>
        <div className="content-2 mt-5" >
        {/* //change css of content-2 */}
                <img src={image} alt="" srcset="" />
            </div>
            </div>
            {/* </div> */}
        <div className="about-need">
          <h1>Main reason to develop this website are -</h1>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li style={{fontSize:"1rem"}}>Education Hub serves as a centralized hub for educational activities, providing a seamless environment for students, teachers, and administrators to collaborate.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li style={{fontSize:"1rem"}}>Students can explore a diverse range of courses offered on the platform, making enrollment a breeze. Our user-friendly interface ensures a smooth and efficient process for students to sign up for multiple courses within a single platform.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li style={{fontSize:"1rem"}}>Teachers have the ability to organize and manage their courses with ease. From uploading lecture notes to assigning tasks and conducting tests, Education Hub empowers educators to create engaging and interactive learning experiences for their students.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li style={{fontSize:"1rem"}}>The platform supports live video lectures, allowing teachers to connect with 40-50 students simultaneously. This real-time interaction fosters a sense of community and engagement, making learning a collaborative and enriching experience.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li style={{fontSize:"1rem"}}>Administrators play a pivotal role in overseeing the platform's functionality. They have the tools to manage teachers, students, and courses efficiently, ensuring a well-organized and secure educational environment.</li>
          </div>
        </div>

        <div className="upcoming-feature">
        <h1>Upcomming Feature</h1>
          <div className="upcoming-feature-1">
          <div className="upcoming-feature-image-1">
            <img src="https://i.postimg.cc/d1ZZ8ByG/ezgif-com-gif-maker-6.gif" alt="" srcset="" />

          </div>
          
            <p >In the relentless pursuit of enhancing Education Hub's functionality, we are excited to introduce upcoming features that will elevate the user experience for both administrators and educators.
            <br />
            <b>Firstly, </b> Enhance financial transparency with our Fees Management system—seamless transactions for students and transparent records for administrators. <br /> <b>Next,</b> Empower institutions with Salary Management—effortless payroll for educators, ensuring transparency and administrative efficiency.
            </p>
          </div>
          <div className="upcoming-feature-2">
          <div className="upcoming-feature-image-2" >

            <img src="https://i.postimg.cc/zvCm6VMV/ezgif-com-gif-maker-7.gif" alt="" srcset="" />
          </div>
            <p> <b> Another,</b> Simplify scheduling with Time Table Management—empower educators to create, modify, and communicate effortlessly for organization and structure.
            <br /> <b>Furthermore,</b> Revolutionize assessments with Education Hub's Online Test Conducting—secure, efficient, and innovative digital testing platform.</p>
          </div>
        </div>








        <Footer/>

      </div>
      {/* </Layout> */}
    </>
  )
}

export default About