import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;



export const joinLiveClass = async(classId) => {
    console.log("back-->", url);

    try {
        const res = await axios.get(`${url}/api/v1/student/joinClass/${classId}`)
        console.log("this is teach-->", res);
        return res.data;




    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}