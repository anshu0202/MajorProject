import liveClassModel from "../models/liveClassModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import fs from "fs";
import noteModel from "../models/noteModel.js";

import {google} from 'googleapis';
import { fileSizeFormatter, getToken } from "../helpers/utils.js";
import pyqModel from "../models/pyqModel.js";
import assignmentModel from "../models/assignmentModel.js";
import teacherModel from "../models/teacherModel.js";
import { comparePassword } from "../helpers/authHelper.js";
import classModel from "../models/classModel.js";

const   client_email=process.env.CLIENT_EMAIL;
const private_key= process.env.PRIVATE_KEY;



const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize(){
  console.log("authorize")
    const jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}











// const CLIENT_ID  = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN });

// const drive = google.drive({
//   version:'v3',
//   auth:oauth2Client
// })

// for managing live classes

export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("ggg ", req.body)

    if (!email || !password) {
      res.status(400).send({
        message: "Invalid email or password",
        success: false,
      });
      return;
    }

    const teacher = await teacherModel.findOne({ email });

    console.log("teacher in teacherAPI -->", teacher);

    if (!teacher) {
      res.status(200).send({
        success: false,
        message: "No Teacher found with given Email-ID",
      });
      return;
    }

    const match = await comparePassword(password, teacher.password);

    if (!match) {
      res.status(404).send({
        message: "Email or Password do not match",
        success: false,
      });
    }

    else {

      const token = await getToken(teacher._id);
      res.status(200).send({
        message: "Teacher successfully login !!",
        teacher,
        success: true,
        token,
      });

    }
  } catch (error) {
    console.log("Error while Teacher login");
    res.status(500).send({
      message: "Error while Teacher login",
      success: false,
      error: error.message,
    });
  }
};


export const getAllTeacherClassController = async (req, res) => {
  try {
    const { tid } = req.params;

    if (!tid) {
      return res.status(400).send("Invalid request");
    }

    const teacher = await teacherModel.findById(tid).populate({
      path: 'assignedClasses.class',
      model: classModel,
    }).populate('assignedClasses.subject');

    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    const assignedClasses = teacher.assignedClasses.map((assignment) => ({
      class: assignment.class,
      subject: assignment.subject,
    }));

    console.log("Assigned classes in teacherController: ", assignedClasses);
    

    res.status(200).send({
      message: "Teacher's assigned classes and subjects",
      data: assignedClasses,
    });
  } catch (error) {
    console.error("Error in getAllTeacherClassController: ", error);
    res.status(500).send({
      message: "Error in getAllTeacherClassController",
      success: false,
      error: error.message,
    });
  }
};













export const liveClassController = async (req, res) => {
  try {
    

    const { classId, teacherId, classRoomId } = req.body;

    if (!classId || !teacherId || !classRoomId) {
      res.status(400).send("Invalid request");
    }

    const liveClass = await new liveClassModel({
      classId,
      teacherId,
      classRoomId,
    }).save();

    res.status(201).send({
      message: "Class room created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while starting a live class ", error.message);
    res.status(500).send({
      message: "Error while starting a live class",
      success: false,
      error: error.message,
    });
  }
};

export const endLiveClassController = async (req, res) => {
  try {
   
    const id = new ObjectId(req.params.id);

    const deleteClass = await liveClassModel.findByIdAndDelete(id);

    if (!deleteClass) {
      res.status(400).send({
        success: false,
        message: "Class already deleted",
      });
    }

    else{
        res.status(200).send({
            message: "Live class has been ended",
            success: true,
          });
    }


    
  } catch (error) {
    console.log("Error while ending a live class ", error.message);
    res.status(500).send({
      message: "Error while ending a live class",
      success: false,
      error: error.message,
    });
  }
};







export const notesUploadController = async ( req, res, next) => {
  try {
   
    console.log("hgefh ",req.fields)

    const authClient = await authorize();

    const userFilePath = req.file.path;
    const userFileName = req.file.originalname;
    const userMimeType = req.file.mimetype;

    const drive = google.drive({ version: 'v3', auth: authClient });

    const gdriveResponse = await drive.files.create({
      requestBody: {
        name: userFileName,
        mimeType: userMimeType,
      },
      media: {
        mimeType: userMimeType,
        body: fs.createReadStream(userFilePath),
      },
    });

    console.log(gdriveResponse.data);
    const gData = gdriveResponse.data;
    const fileId = gData.id;
    console.log("fieldID is this --->", fileId);

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const gResult = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    const gFileUrl = gResult.data;
    console.log("this is gfile-->" , gFileUrl);
      // console.log("Fields this -->",  fields)
    // Assuming "note" is your model for storing file information
    const file = new noteModel({
      fileName: req.file.originalname,
      // filePath: fileId,
      filePath:  gFileUrl , 

      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
      chapter: req.body.chapter,
      subject: req.body.subject,
      credit: req.body.credit,
    });

    await file.save();
    // console.log(file);
    console.log("uploaded suceesful")

    res.status(201).send('File Upload Successfully');
  } catch (error) {
    console.log("Error is ", error.message);
    res.status(400).send(error.message);
  }
};





export const pyqUploadController = async ( req, res, next) => {
  try {
   
    console.log("hgefh ",req.fields)

    const authClient = await authorize();

    const userFilePath = req.file.path;
    const userFileName = req.file.originalname;
    const userMimeType = req.file.mimetype;

    const drive = google.drive({ version: 'v3', auth: authClient });

    const gdriveResponse = await drive.files.create({
      requestBody: {
        name: userFileName,
        mimeType: userMimeType,
      },
      media: {
        mimeType: userMimeType,
        body: fs.createReadStream(userFilePath),
      },
    });

    console.log(gdriveResponse.data);
    const gData = gdriveResponse.data;
    const fileId = gData.id;
    console.log(fileId);

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const gResult = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    const gFileUrl = gResult.data;
    console.log(gFileUrl);

    // Assuming "note" is your model for storing file information
    const file = new pyqModel({
      fileName: req.file.originalname,
      filePath: gFileUrl,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
      chapter: req.body.chapter,
      subject: req.body.subject,
      credit: req.body.credit,
    });

    await file.save();
    console.log(file);
    console.log("uploaded suceesful")

    res.status(201).send('File Upload Successfully');
  } catch (error) {
    console.log("Error is ", error.message);
    res.status(400).send(error.message);
  }
};




export const assignmentUploadController = async ( req, res, next) => {
  try {
   
    console.log("hgefh ",req.fields)

    const authClient = await authorize();

    const userFilePath = req.file.path;
    const userFileName = req.file.originalname;
    const userMimeType = req.file.mimetype;

    const drive = google.drive({ version: 'v3', auth: authClient });

    const gdriveResponse = await drive.files.create({
      requestBody: {
        name: userFileName,
        mimeType: userMimeType,
      },
      media: {
        mimeType: userMimeType,
        body: fs.createReadStream(userFilePath),
      },
    });

    console.log(gdriveResponse.data);
    const gData = gdriveResponse.data;
    const fileId = gData.id;
    console.log(fileId);

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const gResult = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    const gFileUrl = gResult.data;
    // console.log(gFileUrl);

    // Assuming "note" is your model for storing file information
    const file = new assignmentModel({
      fileName: req.file.originalname,
      filePath: gFileUrl,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
      chapter: req.body.chapter,
      subject: req.body.subject,
      credit: req.body.credit,
    });

    await file.save();
    console.log(file);
    console.log("uploaded suceesful")

    res.status(201).send('File Upload Successfully');
  } catch (error) {
    console.log("Error is ", error.message);
    res.status(400).send(error.message);
  }
};


// getting all assignmet

export const getAllAssignmentController=async(req,res)=>{
  try{
    // const {cid,tid}=req.params;

    

    const assignment=await assignmentModel.find();
    return res.status(200).send({
      message:"All assignments",
      data:assignment,
      success:true
    }) 
  }
  catch(error){
    console.log("Error while getting all assignment ", error.message);
    res.status(500).send({
      message:"Error while getting all assignments",
      error:error.message
    })
  }
}

export const getAllPyqController=async(req,res)=>{
  try{
    // const {cid,tid}=req.params;

    const pyqs=await pyqModel.find();
    return res.status(200).send({
      message:"All PYQs",
      data:pyqs,
      success:true
    })
  }
  catch(error){
    console.log("Error while getting all PYQs ", error.message);
    res.status(500).send({
      message:"Error while getting all PYQs",
      error:error.message
    })
  }
}

export const getAllNotesController=async(req,res)=>{
  try{
    // const {cid,tid}=req.params;

    const notes=await noteModel.find();
    return res.status(200).send({
      message:"All Notes",
      data:notes,
      success:true
    })
  }
  catch(error){
    console.log("Error while getting all Notes ", error.message);
    res.status(500).send({
      message:"Error while getting all Notes",
      error:error.message
    })
  }
}


export const getTeacherInfoController=async(req,res)=>{
  const {tid}=req.params;
  try{

    const teacher=await teacherModel.findOne({_id:tid});  
    console.log("treacher ",teacher)
    return res.status(200).send({
      message:"Teacher Info",
      data:teacher,
      success:true
    })
  }
  catch(error){
    console.log("Error while getting teacher info ", error.message);
    res.status(500).send({
      message:"Error while getting teacher info",
      error:error.message
    })
  }
}


//update profile
export const updateProfile=async(req,res)=>{
  try{

    const teacher=await teacherModel.findByIdAndUpdate({_id:req.body._id},req.body,{new:true});  
    return res.status(200).send({
      message:"Profile Updated",
      data:teacher,
      success:true
    })

  }
  catch(error){
    console.log("Error while updating teacher profile ", error.message);
   res.status(500).send({
     message:"Error while updating teacher profile",
     error:error.message
   })
  }
}












// export const  notesUploadController=async(authClient)=>{
//   return new Promise((resolve,rejected)=>{
//       const drive = google.drive({version:'v3',auth:authClient}); 
//       var fileMetaData = {
//           name:'mydrivetext.txt',    
//           parents:['1gBLE6ICWDVVTcGbTwLhVbNE0KwvD1Yb9'] // A folder ID to which file will get uploaded
//       }
//       drive.files.create({
//           resource:fileMetaData,
//           media:{
//               body: fs.createReadStream('mydrivetext.txt'), // files that will get uploaded
//               mimeType:'text/plain'
//           },
//           fields:'id'
//       },function(error,file){
//           if(error){
//               return rejected(error)
//           }
//           resolve(file);
//       })
//   });
// }








// export const notesUploadController = async (req, res, next) => {
//   try {

//       const userFilePath = req.file.path;
//       const userFileName = req.file.originalname;
//       const userMimeType = req.file.mimetype;


//       const gdriveResponse = await drive.files.create({
//           requestBody:{
//               name:userFileName,
//               mimeType:userMimeType
//           },
//           media:{
//               mimeType:userMimeType,
//               body: fs.createReadStream(userFilePath)
//           }
//       })
//       console.log(gdriveResponse.data);
//       const gData = gdriveResponse.data;
//       const fileId = gData.id;
//       console.log(fileId);

//       await drive.permissions.create({
//           fileId:fileId,
//           requestBody:{
//               role:'reader',
//               type:'anyone'
//           }
//       })

//       const gResult = drive.files.get({
//           fileId: fileId,
//           fields: 'webViewLink, webContentLink'
//       })
//       const gFileUrl = gResult.data;
//       console.log(gFileUrl);

//       const file = new note({
//           fileName: req.file.originalname,
//           filePath: fileId,
          
//           fileType: req.file.mimetype,
//           fileSize: fileSizeFormatter(req.file.size, 2), //0.00
//           chapter: req.body.chapter,
//           subject: req.body.subject,
//           credit: req.body.credit,
//       });
//       await file.save();
//       console.log(file);
      
//       res.status(201).send('File Upload Successfully');
//   } catch (error) {
//       res.status(400).send(error.message);
//   }
// }

