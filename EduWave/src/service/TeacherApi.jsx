import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;


export const teacherLogin = async(data) => {
    console.log("services data login -->", data);

    try {
        const res = await axios.post(`${url}/api/v1/teacher/login`, data)
        console.log("this is Teacher login data-->", res);
        return res?.data;

    } catch (error) {
        console.log("Error  baaackservies Submitting data in frontEnd --> ", error);
    }

}





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

export const uploadNotes =  async(data)=>{
    try {
        const res = await axios.post(`${url}/api/v1/teacher/notes/upload/` , data);
        console.log("Res in notes upload",res);
        return res.data
    } catch (error) {
        console.log("Error while uploading notes!!" , error); 
    }
}


export const uploadPYQS =  async(data)=>{
    try {
        const res = await axios.post(`${url}/api/v1/teacher/pyq/upload` , data);
        console.log("Res in PYQA upload i nbackend",res);
        return res.data
    } catch (error) {
        console.log("Error while uploading notes!!" , error);
        
    }
}


export const uploadAssignment =  async(data)=>{
    try {
        const res = await axios.post(`${url}/api/v1/teacher/assignment/upload` , data);
        console.log("Res in Assignment upload i nbackend",res);
        return res.data
    } catch (error) {
        console.log("Error while uploading notes!!" , error);
        
    }
}

