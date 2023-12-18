import newStudentReqModel from "../models/newStudentReqModel.js";
import newTeacherReqModel from "../models/newTeacherReqModel.js";
import teacherModel from "../models/teacherModel.js";
import studentModel from "../models/studentModel.js";
import classModel from "../models/classModel.js";
import subjectModel from "../models/subjectModel.js";

export const getAllTeacherReq = async(req , res)=>{

    try {

        const newTeacherList = await newTeacherReqModel.find({});

        res.status(200).send({
            message:"All Teacher Request List",
            data:newTeacherList,
        })
    
    } catch (error) {
        console.log("Error While Getting All Teacher Request ", error);
        res.status(500).send({
            message:"Error While Getting All Teacher Request",
            error
        })
    }
}

export const getAllStudentReq = async(req , res)=>{

    try {

        const newStudentList = await newStudentReqModel.find({});

        res.status(200).send({
            message:"All Student Request List",
            data:newStudentList,
        })
    
    } catch (error) {
        console.log("Error While Getting All Student Request ", error);
        res.status(500).send({
            message:"Error While Getting All Student Request",
            error
        })
    }
}


export const teacherApproval = async(req , res)=>{
    try {

        const teacherId = req.params.id;
        const existingTeacher = await newTeacherReqModel.findById(teacherId);
        if(!existingTeacher){
            return res.status(404).send({
                message:"Teacher Not Found",
            })
        }
        const teacher = await newTeacherReqModel.findByIdAndDelete(teacherId);
        console.log("thisis thesiakjd -->",  teacher);
        const newTeacher = await teacherModel.create({
            firstName: teacher.fname,
            lastName: teacher.lname,
            // userName: teacher.userName,
            email: teacher.email,
            password: teacher.password,
            // dob: teacher.dob,
            // gender: teacher.gender,
            // profilePic: teacher.profilePic,
            // phone: teacher.phone,
            // address: teacher.address
        });

        await newTeacher.save();

        res.status(200).send({
            message:"Teacher Request Approved",
            data:newTeacher,
        })


        
    } catch (error) {
        console.log("Error While Approving Teacher Request ", error);
        res.status(500).send({
            message:"Error While Approving Teacher Request",
            error
        })
        
    }
}


export const studentApproval = async(req , res)=>{
    try {

        const studentId = req.params.id;
        const existingStudent = await newStudentReqModel.findById(studentId);
        if(!existingStudent){
            return res.status(404).send({
                message:"Student Not Found",
            })
        }
        const student = await newStudentReqModel.findByIdAndDelete(studentId);
        console.log("thisis thesiakjd -->",  student);
        const newStudent = await studentModel.create({
            firstName: student.fname,
            lastName: student.lname,
            // userName: teacher.userName,
            email: student.email,
            password: student.password,
            // dob: teacher.dob,
            // gender: teacher.gender,
            // profilePic: teacher.profilePic,
            // phone: teacher.phone,
            // address: teacher.address
        });

        await newStudent.save();

        res.status(200).send({
            message:"Student Request Approved",
            data:newStudent,
        })


        
    } catch (error) {
        console.log("Error While Approving Student Request ", error);
        res.status(500).send({
            message:"Error While Approving Student Request",
            error
        })
        
    }
}


export  const createSubjects= async(req,res)=>{
    try{
     const {subjectName, description} = req.body;
     const existingSubject= await subjectModel.findOne({subjectName});
     if(existingSubject){
        return res.status(400).send({
            message:"Subject Already Exists",
        })
     }

     if(!subjectName){
        return res.status(400).send({
            message:"Subject Name is Required",
        })
     }

     const newSubject = await subjectModel.create({
        subjectName,
        description
     });
      await newSubject.save();

      res.status(201).send({
        success:true,
        message:"New Subject Created",
        data:newSubject,
      })

    }

    catch(error){
         console.log("Error while creating new subject ", error.message);
         res.status(500).send({
            error:error.message,
            message:"Error while creating new subject",
         })
    }
}

export const createNewClass = async(req , res) =>{


    try {
        const { className , subjectList } = req.body;

        if(!className){
            return res.status(400).send({
                message:"Class Name is Required",
            })
        }
        if(subjectList.length === 0){
            return res.status(400).send({
                message:"Add atleast 1 Subject !!",
            })
        }

        const existingClass = await classModel.findOne({className});
        if(existingClass){
            return res.status(400).send({
                message:"Class Already Exists",
            })
        }

        const newClass = await classModel.create({
            className,
            subjectList
        });

        await newClass.save();

        res.status(201).send({
            message:"New Class Created",
            data:newClass,
        })



        
    } catch (error) {
        console.log("Error While Creating New Class ", error);
        res.status(500).send({
            message:"Error While Creating New Class",
            error
        })
    }




}


export const getAllClassController = async (req, res) => {
    try {
        const allClasses = await classModel.find().populate({
            path: 'subjectList.subjectId',
            model: subjectModel,
        }).populate('subjectList.teacherId');
        
        res.status(200).send({
            message: "All Classes",
            data: allClasses,
        });
    } catch (error) {
        console.log("Error while getting all class list ", error.message);
        res.status(500).send({
            message: "Error while getting every class",
            error,
        });
    }
};


export const getAllSubjectController = async(req,res)=>{

    try {
        const allSubjects = await subjectModel.find();
        res.status(200).send({
            message:"All Subjects",
            data:allSubjects
        })
    } catch (error) {
        console.log("Error while getting all subject list ",error.message);
        res.status(500).send({
            message:"Error while getting every subject",
            error
        })
    }
}



export const allocateClassController = async(req,res)=>{
    try{
        const {teacherId, classId, subjectId} = req.body;

        if(!teacherId){
            res.status(400).send({
                message:"Teacher Id is Required",
               success:false
            })
        }
        if(!classId){
            res.status(400).send({
                message:"Class Id is Required",
               success:false
            })
        }
        if(!subjectId){
            res.status(400).send({
                message:"Subject Id is Required",
               success:false
            })
        }


        const newClass = await classModel.findByIdAndUpdate(classId,{
            $push:{
                subjectList:{
                    subjectId,
                    teacherId
                }
            }
        })

        await newClass.save();

        const updatedTeacher = await teacherModel.findByIdAndUpdate(
            teacherId,
            {
                $push: {
                    assignedClasses: {
                        class: classId,
                        subject: subjectId,
                    },
                },
            },
           
        );

        await updatedTeacher.save();

        res.status(200).send({
            message:"Class Allocated Successfully",
            success:true,
            updatedTeacher,
            newClass
        })
    

    }
    catch(error){
        console.log("Error while allocating class ", error);
        res.status(500).send({
            message:"Error while allocating class",
            error
        })
    }
}
