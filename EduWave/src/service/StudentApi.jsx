import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;



//register
export const Register = async(data) => {
    // console.log("back-->", url);

    try {
        const res = await axios.post(`${url}/api/v1/auth/register`, data)
        console.log("this is register data-->", res);
        return res.data;




    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}

export const newTeacherRegister = async(data) => {
    // console.log("back-->", url);

    try {
        const res = await axios.post(`${url}/api/v1/newReq/newTeacherRegister`, data)
        console.log("this is register Teacher Register-->", res);
        return res.data;




    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}


export const newStudentRegister = async(data) => {
    // console.log("back-->", url);

    try {
        const res = await axios.post(`${url}/api/v1/newReq/newStudentRegister`, data)
        console.log("this is Studnet Register  data-->", res);
        return res.data;

    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}

// login

export const studentLogin = async(data) => {
    console.log("services data login -->", data);

    try {
        const res = await axios.post(`${url}/api/v1/student/login`, data)
        console.log("this is student login data-->", res);
        return res.data;

    } catch (error) {
        console.log("Error  baaackservies Submitting data in frontEnd --> ", error);
    }

}












export const joinLiveClass = async (classId) => {
    console.log("back-->", url);

    try {
        const res = await axios.get(`${url}/api/v1/student/joinClass/${classId}`)
        console.log("this is teach-->", res);
        return res.data;




    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
    }

}


export const getLiveClassList=async()=>{
     try{
        const res=await axios.get(`${url}/api/v1/student/getLiveClass`)
        // console.log("liist is ",res.data);
        return res.data;
     }
     catch(error){
        console.log("Error while getting live class List",error.message);

     }
}