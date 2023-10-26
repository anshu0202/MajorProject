import express from "express";
import upload from "../middlewares/multer.js";

import {
  addAttendanceController,
  assignmentSubmitController,
  getAllAttendance,
  getAssignmentController,
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

// upload assignment
router.post('/submit/assignment', upload.single('file'), assignmentSubmitController);
router.get('/getAssignment/:sid/:cid', upload.single('file'), getAssignmentController);








//join class 
router.get('/joinClass/:id',joinLiveClass);











export default router;
