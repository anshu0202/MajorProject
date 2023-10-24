import React from 'react'
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { useTeacher } from '../context/Teacher';


const RoomPage = () => {
    const { roomID } = useParams();
    const { teacherData, setTeacherData } = useTeacher();

    const myMeeting = async (element) => {
        console.log("teacher data" , teacherData)
        // const appID = import.meta.env.VITE_APP_ID;
        const appID = 1661547157;

        console.log("thisb is is app id -->" , appID);

        // const serverSecret = import.meta.env.VITE_SERVER_SECRET;
        const serverSecret = "1c0498b400a8f29784c2b4dc3c08cc40"

        console.log("thisb is is secret id -->" , serverSecret);


        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            teacherData?.teacherName,);

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        // zc.addPlugins({ ZegoSuperBoardManager });
        zc.joinRoom({
            container: element,
            whiteboardConfig: {
                showAddImageButton: true,
            },
            // sharedLinks: [
            //     {
            //         name: 'Personal link',
            //         url:
            //             window.location.protocol + '//' +
            //             window.location.host + window.location.pathname +
            //             '?roomID=' +
            //             roomID,
            //     },
            // ],
            videoResolutionList: [
                ZegoUIKitPrebuilt.VideoResolution_360P,
                ZegoUIKitPrebuilt.VideoResolution_180P,
                ZegoUIKitPrebuilt.VideoResolution_480P,
                ZegoUIKitPrebuilt.VideoResolution_720P,
            ],
            videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,


            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
        });


    }



    return (
        <Layout>

            <div style={{ width: "100%" , height: "100vh" }} className='container  '>
                <div  className='d-flex justify-content-center align-items-center h-100 w-100' ref={myMeeting} />
            </div>


        </Layout>
    )
}

export default RoomPage