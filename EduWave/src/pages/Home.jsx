import React, { useCallback, useState } from 'react'
import Layout from '../components/Layout/Layout'
import webrtc from "../assets/img/webrtc.gif";
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@mui/material';
import { toast } from 'react-toastify';
import Navbar from './Home/Navbar';
import Hero from './Home/Hero';
import Feature from './Home/Feature';
import Footer from './Home/Footer';
const Home = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${roomID}`);
        toast.success("Successfull Room Join")
    }, [navigate, roomID])



    return (
        <>
            <Navbar />
            <Hero/>
            <Feature/>
            <Footer/>
        </>

    )
}

export default Home