// import { ConnectionStates } from "mongoose";
import { hashPassword } from "../helpers/authHelper.js";
import newStudentReqModel from "../models/newStudentReqModel.js";
import newTeacherReqModel from "../models/newTeacherReqModel.js";



export const newTeacherController = async (req, res) => {

    const { fname, lname, email, password, role } = req.body;
    console.log("THis is body in teahcerController", req.body);

    try {
          // validation 
          if (!fname) {
            return res.send({ message: 'First Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!lname) {
            return res.send({ message: 'Last Name is Required' })
        }
        if (!role) {
            return res.send({ message: 'Role is Required' })
        }
        // if (!address) {
        //     return res.send({ message: 'Role is Required' })
        // }
        // if (!phone) {
        //     return res.send({ message: 'Role is Required' })
        // }

        const existingUser = await newTeacherReqModel.findOne({ email });
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Teacher Already Registered !'
            })
        }

        const hashedPassword = await hashPassword(password);

        const newTeacher = await new newTeacherReqModel({
            fname, email, lname,   password: hashedPassword ,  role
        })

        console.log("newTeacher: ", newTeacher);

        await newTeacher.save();

        res.status(201).send({
            success: true,
            message: "New Teacher Registered Successfully",
            newTeacher
        })




        
    } catch (error) {
        console.log("Error in newTeacherController: ", error);
        res.status(500).send({
            success: false,
            message: "Error while creating New teacher",
            error
        })
    }






}


export const newStudentController = async (req, res) => {

    const { fname, lname, email, password, role } = req.body;

    try {
          // validation 
          if (!fname) {
            return res.send({ message: 'First Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!lname) {
            return res.send({ message: 'Last Name is Required' })
        }
        if (!role) {
            return res.send({ message: 'Role is Required' })
        }
        // if (!address) {
        //     return res.send({ message: 'Role is Required' })
        // }
        // if (!phone) {
        //     return res.send({ message: 'Role is Required' })
        // }

        const existingUser = await newStudentReqModel.findOne({ email });
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Student Already Registered !'
            })
        }

        const hashedPassword = await hashPassword(password);

        const newStudent = await new newStudentReqModel({
            fname, email, lname,   password: hashedPassword ,  role
        })

        await newStudent.save();

        res.status(201).send({
            success: true,
            message: "New Student Registered Successfully",
            newStudent
        })




        
    } catch (error) {
        console.log("Error in newStudentController: ", error);
        res.status(500).send({
            success: false,
            message: "Error while creating New Student",
            error
        })
    }
}