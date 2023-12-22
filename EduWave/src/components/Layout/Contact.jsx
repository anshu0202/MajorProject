import React from 'react'
import { useState,useRef } from 'react'
// import Navbar from './Navbar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import emailjs from '@emailjs/browser';
import Layout from './Layout';
import Navbar from '../../pages/Home/Navbar';
import './Contact.css'
import Footer from '../../pages/Home/Footer';
function Contact() {

  const form = useRef();

  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const submitHandler=(e)=>{
    e.preventDefault();

    emailjs.sendForm('service_fngeffr', 'template_yia793n', form.current, 'uZdcBVK-1YBxbehfy')
      .then((result) => {
          console.log(result.text);
          alert("Message Sent");
        //   setEmailSubmitted("");
        window.location.reload();
          setEmailSubmitted(true);
      }, (error) => {
        alert(error.text);
          console.log(error.text);
      });
  }
  
  return (
    <>
    <Navbar/>
    {/* <Layout> */}
        <div className="contact">
          <form ref={form} onSubmit={submitHandler} className="contact-content-1">
          <input  required placeholder='Enter Your Name' type="text" name="from_name" id="name" />
          <input  required placeholder='Enter Your Email' type="email" name="email_id" id="email" />
          <input  required placeholder='Enter Subject' type="text" name="subject" id="subject" />

          <textarea   required name="message" id="message"  rows="5"></textarea>
          <button type='submit'  name="Upload" id="" >Submit</button>
          </form>

          <div className="contact-content-2">
            <img src="https://i.postimg.cc/KvSxFbJF/ezgif-com-gif-maker-8.gif" alt="" srcset="" />
          </div>
          
        </div>
        {/* </Layout> */}
        <Footer/>
    </>
  )
}

export default Contact