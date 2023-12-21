import axios from "axios";
// import { Toast } from "react-bootstrap";
const url = import.meta.env.VITE_BACKEND_URL; 


export const getAllSubjects = async() => {
    try {
        const res =  await axios.get(`${url}/api/v1/admin/getAllSubjects`);
        // console.log("this is getting All Subjects data-->", res?.data?.data);
        return res?.data;

        
    } catch (error) {
        console.log("Error while Submitting getting All Subjects data in frontEnd --> ", error);
        
    }
}

export const createNewClass  = (data)=>{
    try {

        const res = axios.post(`${url}/api/v1/admin/createNewClass` , data);
        // console.log("this is creating new class data response-->", res);

        return res;
        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);

        
    }
}


export const createNewSubject  = async(data)=>{
    try {

        const res = await axios.post(`${url}/api/v1/admin/createNewSubject` , data);
        // console.log("this is creating new Subject data response-->", res);

        return res;
        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);

        
    }
}

export const getAllClassesList  = async()=>{
    try {

        const res = await axios.get(`${url}/api/v1/admin/getAllClassList` );
        // console.log("All classes List -->", res);

        return res?.data;
        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);

        
    }
}

export const getAllTeachersReqList  = async()=>{
    try {

        const res = await axios.get(`${url}/api/v1/admin/getTeacherReqList` );
        // console.log("All classes List -->", res);

        return res;
        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);

        
    }
}


export const getAllTeacherList = async()=>{
    try {
        const res = await axios.get(`${url}/api/v1/admin/getAllTeacher`);
        // console.log("this is getting All Teacher data-->", res?.data);
        return res?.data;

        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
        
    }
}

export const teacherApproval = async(data)=>{
    try {
        const res = await axios.put(`${url}/api/v1/admin/teacherApproval/${data}`);
        // console.log("this is getting All Teacher data-->", res?.data);
        return res?.data;

        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
        
    }
}

export const studentApproval = async(data)=>{
    try {
        const res = await axios.put(`${url}/api/v1/admin/studentApproval/${data}`);
        // console.log("this is getting All Teacher data-->", res?.data);
        return res?.data;

    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
        
    }
}

export const getAllStudentReqList  = async()=>{
    try {

        const res = await axios.get(`${url}/api/v1/admin/getStudentReqList` );
        // console.log("All classes List -->", res);
        return res;
        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);

        
    }
}

export const getAllStudentList = async()=>{
    try {
        const res = await axios.get(`${url}/api/v1/admin/getAllStudent`);
        // console.log("this is getting All Student data-->", res?.data);
        return res?.data;

        
    } catch (error) {
        console.log("Error while Submitting data in frontEnd --> ", error);
        
    }
}


export const deleteTeacherReq=async(tid)=>{
    try{

        const res = await axios.delete(`${url}/api/v1/admin/deleteTeacherReq/${tid}`);
        // console.log("Teacher request deleted successfully", res);
        return res.data;

    }
    catch(error){
        console.log("Error while deleting teacher request", error);
    }
}
export const deleteStudentReq=async(sid)=>{
    try{

        const res = await axios.delete(`${url}/api/v1/admin/deleteStudentReq/${sid}`);
        // console.log("Student request deleted successfully", res);
        return res.data;

    }
    catch(error){
        console.log("Error while deleting student request", error);
    }
}

export const getSubjectById=async(id)=>{
    try{

        const res = await axios.get(`${url}/api/v1/admin/getSubjectById/${id}`);
        // console.log("Subject request fethed successfully", res);
        return res?.data;
    }
    catch(error){
        console.log("Error while getting subject details by id", error);
    }
}

export const getClasstById=async(id)=>{
    try{

        const res = await axios.get(`${url}/api/v1/admin/getClassById/${id}`);
        // console.log("Class request fethed successfully", res);
        return res?.data;
    }
    catch(error){
        console.log("Error while getting Class details by id", error);
    }
}


export const teacherClassAllocation=async(data)=>{
    try{
        const res = await axios.post(`${url}/api/v1/admin/teacherClassAllocation`, data);
        // console.log("Class Allocated successfully", res);
        return res.data;
    }
    catch(error){
        console.log("Error while class allocation", error);
    }
}


export const classList=async(data)=>{
    try{
        const res = await axios.post(`${url}/api/v1/admin/getAllClassList`, data);
        // console.log("Class List HEre in admin API ", res);
        return res.data;
    }
    catch(error){
        console.log("Error while class allocation", error);
    }
}


// export const getSubjectById=async(id)=>{
//     try{
//         const res = await axios.post(`${url}/api/v1/admin/getAllClassList`, data);
//         console.log("Class List HEre in admin API ", res);
//         return res.data;
//     }
//     catch(error){
//         console.log("Error while class allocation", error);
//     }
// }