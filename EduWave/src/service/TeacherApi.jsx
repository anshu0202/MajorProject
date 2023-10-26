import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;



export const startLiveClass = async(data) => {
    console.log("back-->", url);
    try {
        const res = await axios.post(`${url}/api/v1/teacher/startClass`, data)
        console.log("this is teach-->", res);
        return res.data;




    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}


//upload NOtes/PDF

export const uploadNotes =  async()=>{
    try {

        const res = await axios.post(`${url}/api/teacher/`)



        
    } catch (error) {
        console.log("Error while uploading notes!!" , error);
        
    }
}

