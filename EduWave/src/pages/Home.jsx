import React from 'react'
import Layout from '../components/Layout/Layout'
import webrtc from "../assets/img/webrtc.gif";
const Home = () => {
    return (
        <Layout>
            <h1>Home</h1>
            <div className='container text-center'>

                <img style={{ width: "50%" }} src={webrtc} alt="web-rtc dig." />

            </div>

        </Layout>

    )
}

export default Home