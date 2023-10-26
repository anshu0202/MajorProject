import { comparePassword, getToken, hashPassword } from "../helpers/utils.js";
import studentModel from "../models/studentModel.js";
import attendanceModel from "../models/studentAttendanceModel.js";
import liveClassModel from "../models/liveClassModel.js";

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










