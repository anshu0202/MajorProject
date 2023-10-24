import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;



//register
export const studentRegister = async(data) => {
    // console.log("back-->", url);

    try {
        const res = await axios.post(`${url}/api/v1/student/register`, data)
        console.log("this is register data-->", res);
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
        console.log("this is login data-->", res);
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
