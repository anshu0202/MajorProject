import liveClassModel from "../models/liveClassModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import fs from "fs";
// import noteModel from "../models/noteModel.js";

import {google} from 'googleapis';

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
    // const file = new note({
    //   fileName: req.file.originalname,
    //   filePath: fileId,
    //   fileType: req.file.mimetype,
    //   fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
    //   chapter: req.body.chapter,
    //   subject: req.body.subject,
    //   credit: req.body.credit,
    // });

    // await file.save();
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
    // const file = new note({
    //   fileName: req.file.originalname,
    //   filePath: fileId,
    //   fileType: req.file.mimetype,
    //   fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
    //   chapter: req.body.chapter,
    //   subject: req.body.subject,
    //   credit: req.body.credit,
    // });

    // await file.save();
    // console.log(file);
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
    console.log(gFileUrl);

    // Assuming "note" is your model for storing file information
    // const file = new note({
    //   fileName: req.file.originalname,
    //   filePath: fileId,
    //   fileType: req.file.mimetype,
    //   fileSize: fileSizeFormatter(req.file.size, 2), // Format the size as needed
    //   chapter: req.body.chapter,
    //   subject: req.body.subject,
    //   credit: req.body.credit,
    // });

    // await file.save();
    // console.log(file);
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
    const {cid,tid}=req.params;

    // const assignment=await 
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
    const {cid,tid}=req.params;

    // const assignment=await 
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
    const {cid,tid}=req.params;

    // const assignment=await 
  }
  catch(error){
    console.log("Error while getting all Notes ", error.message);
    res.status(500).send({
      message:"Error while getting all Notes",
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

