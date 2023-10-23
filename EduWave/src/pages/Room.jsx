import React, { useState } from 'react'
import Layout from '../components/Layout/Layout';
import { Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { toast } from 'react-toastify';



const Room = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    
   const handleJoinRoom = useCallback(() => {
       navigate(`/room/${roomID}`);
       toast.success("Successfull Room Join")
   },[navigate , roomID])


    return (
        <Layout>
            <h1>Room</h1>
            <div className='container text-center'>
                <div className='row'>
                    <div className='col-md-6'>

                        <h3>Here is the room</h3>

                        <div className='d-grid gap-2'>
                            <Input type="text" placeholder='Enter Room Code ' value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                            <Button variant='contained' color='success' onClick={handleJoinRoom}>JOIN Room </Button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                       <h3> here is information and oher stuffs</h3>
                    </div>



                </div>
            </div>
        </Layout>
    )
}

export default Room