import express from "express";
import {
  addAttendanceController,
  getAllAttendance,
  getAttendanceByClass,
  joinLiveClass,
  studentLogin,
  studentRegisterController,
  updateStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register", studentRegisterController);

router.post("/login", studentLogin);

router.put("/updateProfile/:id", updateStudentProfile);

//attendance

router.post("/addAttendance", addAttendanceController);

router.get("/getAttendance/:id",getAllAttendance);

router.get("/getClassAttendance/:sid/:cid",getAttendanceByClass)


//join class 
router.get('/joinClass/:id',joinLiveClass);











export default router;
