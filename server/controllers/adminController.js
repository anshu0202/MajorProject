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
                success:false
            })
        }
        const teacher = await newTeacherReqModel.findByIdAndDelete(teacherId);
        // console.log("thisis thesiakjd -->",  teacher);
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
            success:true
        })


        
    } catch (error) {
        console.log("Error While Approving Teacher Request ", error);
        res.status(500).send({
            message:"Error While Approving Teacher Request",
            error,
            success:false
        })
        
    }
}


export const getAllteacherList = async(req , res)=>{
    try {

        const teacherList = await teacherModel.find({});
        res.status(200).send({
            message:"All Teacher List",
            data:teacherList,
        })

        
    } catch (error) {
        console.log("Error While Getting All Teacher List ", error);
        res.status(500).send({
            message:"Error While Getting All Teacher List",
            error
        })
        
    }
}

export const getAllStudentList = async(req , res)=>{
    try {

        const studentList = await studentModel.find({});
        res.status(200).send({
            message:"All Student List",
            data:studentList,

        })

        
    } catch (error) {
        console.log("Error While Getting All Student List ", error);
        res.status(500).send({
            message:"Error While Getting All Student List",
            error,
            success:false
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
                success:false
            })
        }
        const student = await newStudentReqModel.findByIdAndDelete(studentId);
        // console.log("thisis thesiakjd -->",  student);
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
            success:true
        })


        
    } catch (error) {
        console.log("Error While Approving Student Request ", error);
        res.status(500).send({
            message:"Error While Approving Student Request",
            error,
            success:false
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

        // console.log("this is the subjectList-->", subjectList);

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

        console.log("created class is ",newClass);

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
        const allClasses = await classModel.find();
        res.status(200).send({
            success: true,
            message: "All Classes",
            data: allClasses,
        })
       
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



export const allocateClassController = async (req, res) => {
    try {
        const { teacherId, classId, subjectId } = req.body;
        console.log("Request body ", req.body);

        // Validation for required fields
        if (!teacherId || !classId || !subjectId) {
            return res.status(400).send({
                message: "Teacher Id, Class Id, and Subject Id are required.",
                success: false,
            });
        }

        // Check if the class exists and the subject is part of the class
        const existingClass = await classModel.findOne({
            _id: classId,
    subjectList: {
        $elemMatch: {
            subjectId: subjectId,
        },
    },
        });

        console.log("class --> ",existingClass);

        if (!existingClass) {
            return res.status(400).send({
                message: "Class or Subject Not Found",
                success: false,
            });
        }

        // If subjectId exists, add the teacherId to the existing entry
        const updatedClass = await classModel.findOneAndUpdate(
            {
                _id: classId,
                'subjectList.subjectId': subjectId,
            },
            {
                $set: {
                    'subjectList.$.teacherId': teacherId,
                },
            },
            { new: true } // Return the modified document
        );

        // Update the teacher with the assigned class and subject
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
            { new: true } // Return the modified document
        );

        res.status(200).json({
            message: "Class Allocated Successfully",
            success: true,
            updatedTeacher,
            updatedClass,
        });
    } catch (error) {
        console.error("Error while allocating class ", error.message);
        res.status(500).json({
            message: "Error while allocating class",
            success: false,
            error: error.message,
        });
    }
};

// deleting student and teacher request
export const deleteStudentReqController = async (req, res) => {
    const { sid } = req.params; // Assuming you pass requestId in the request parameters

    try {
        const deletedStudentReq = await newStudentReqModel.findByIdAndDelete(sid);

        if (!deletedStudentReq) {
            // If the request with the given id is not found
            return res.status(404).send({
                message: "Student request not found",
            });
        }

        res.status(200).send({
            message: "Student request deleted successfully",
            data: deletedStudentReq,
            success:true
        });
    } catch (error) {
        console.error("Error while deleting student request: ", error.message);
        res.status(500).json({
            message: "Error while deleting student request",
            error: error.message,
            success:false
        });
    }
};

export const deleteTeacherReqController = async (req, res) => {
    const { tid } = req.params; // Assuming you pass requestId in the request parameters

    try {
        const deletedStudentReq = await newTeacherReqModel.findByIdAndDelete(tid);

        if (!deletedStudentReq) {
            // If the request with the given id is not found
            return res.status(404).send({
                message: "Teacher request not found",
                success:false
            });
        }

        res.status(200).send({
            message: "Teacher request deleted successfully",
            data: deletedStudentReq,
            success:true
        });
    } catch (error) {
        console.error("Error while deleting teacher request: ", error.message);
        res.status(500).json({
            message: "Error while deleting teacher request",
            error: error.message,
            success:false
        });
    }
};



export const getSubjectByIdController = async (req, res) => {
    const { subjectId } = req.params;

    try {
        const subject = await subjectModel.findById(subjectId);

        if (!subject) {
            return res.status(404).send({
                message: "Subject not found",
                success:false
            });
        }

        res.status(200).send({
            message: "Subject retrieved successfully",
            data: subject,
            success:true
        });
    } catch (error) {
        console.error("Error while getting subject by ID: ", error.message);
        res.status(500).send({
            message: "Error while getting subject by ID",
            error: error.message,
            success:false
        });
    }
};