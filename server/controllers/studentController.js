import { comparePassword, getToken, hashPassword } from "../helpers/utils.js";
import studentModel from "../models/studentModel.js";
import attendanceModel from "../models/studentAttendanceModel.js";
import liveClassModel from "../models/liveClassModel.js";
import fs from "fs";
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


export const studentRegisterController = async (req, res) => {
  try {
    console.log("req ", req.body);

    const { firstName, lastName, userName, password, email } = req.body;

    if (!firstName) {
      res.status(200).send({
        success: true,
        message: "First name cannot be empty",
      });
    }

    const existStudent = await studentModel.findOne({ userName });

    if (existStudent) {
      res.status(200).send({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const student = await new studentModel({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
    }).save();

    res.status(201).send({
      message: "Student registered successfully",
      success: true,
      student,
    });
  } catch (error) {
    console.log("Error while student register");
    res.status(500).send({
      error: error.message,
      message: "Erorr while student register",
      success: false,
    });
  }
};

//login part is left
export const studentLogin = async (req, res) => {
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

    const student = await studentModel.findOne({ email });

    if (!student) {
      res.status(404).send({
        message: "No student found with given Email-ID",
        success: true,
      });
      return;
    }

    const match = await comparePassword(password, student.password);

    if (!match) {
      res.status(404).send({
        message: "Email or Password do not match",
        success: false,
      });
    }

    else {

      const token = await getToken(student._id);
      res.status(200).send({
        message: "Student successfully login !!",
        student,
        success: true,
        token,
      });

    }
  } catch (error) {
    console.log("Error while student login");
    res.status(500).send({
      message: "Error while student login",
      success: false,
      error: error.message,
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedStudent = await studentModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).send({
        error: "No student found ",
        success: false,
      });
    }

    res.status(200).send({
      success: true,
      message: "Student profile updated successfully",
      updatedStudent,
    });
  } catch (error) {
    console.log("Error while student profile update");
    res.status(500).send({
      success: false,
      message: "Error while student profile update",
      error: error.message,
    });
  }
};

// add attendance

export const addAttendanceController = async (req, res) => {
  try {
    const { classId, studentId, date } = req.body;

    if (!classId || !studentId || !date) {
      res.status(400).send({
        message: "Invalid request",
        success: false,
      });
    }

    const attendanceRecord = await attendanceModel.findOne({
      classId: classId,
      studentId: studentId,
    });

    if (!attendanceRecord) {
      // If the record doesn't exist, create a new one
      const newRecord = new attendanceModel({
        classId: classId,
        studentId: studentId,
        attendanceDates: [date],
      });
      await newRecord.save();
    } else {
      // If the record exists, push the date into the attendanceDates array
      attendanceRecord.attendanceDates.push(date);
      await attendanceRecord.save();
    }

    res.status(200).send({
      message: "Attendance marked successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while marking attendance ", error.message);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while marking attendance",
    });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const studentId = req.params.id;

    const attendanceList = await attendanceModel.findOne(studentId);

    res.status(200).send({
      success: true,
      attendanceList,
      message: "Attendance list of student",
    });
  } catch (error) {
    console.log("Error while getting attendance ", error.message);
    res.send(500).send({
      message: "Error while getting attendance list",
      success: false,
      error: error.message,
    });
  }
};

export const getAttendanceByClass = async (req, res) => {
  try {
    const studentId = req.params.sid;
    const classId = req.params.cid;

    const attendanceList = await attendanceModel.findOne({
      classId,
      studentId,
    });

    res.status(200).send({
      success: true,
      attendanceList,
      message: "Attendance list of student of given class",
    });
  } catch (error) {
    console.log(
      "Error while getting attendance of given class ",
      error.message
    );
    res.send(500).send({
      message: "Error while getting attendance list of given class",
      success: false,
      error: error.message,
    });
  }
};

// join live class

export const joinLiveClass = async (req, res) => {
  try {
    const id = req.params.id;

    const getClass = await liveClassModel.findOne({ classId: id });

    if (!getClass) {
      res.status(200).send({
        message: "Class has been either ended or not started by the teacher",
      });
    } else {
      res.status(200).send({
        message: "Classroom id fetch successfully",
        classRoomId: getClass.classRoomId,
      });
    }
  } catch (error) {
    console.log("Error while joining live class ", error.message);
    res.send(500).status({
      success: false,
      message: "Error while joining live class",
      error: error.message,
    });
  }
};



export const assignmentSubmitController = async ( req, res, next) => {
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
    // const file = new ({
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





export const getAssignmentController = async ( req, res, next) => {
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
    // const file = new ({
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










