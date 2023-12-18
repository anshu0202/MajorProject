import express from "express";
import { createNewClass, createSubjects, getAllClassController, getAllStudentReq, getAllSubjectController, getAllTeacherReq, studentApproval, teacherApproval } from "../controllers/adminController.js";

const router = express.Router();

router.get("/getStudentReqList" , getAllStudentReq );
router.get("/getTeacherReqList" , getAllTeacherReq );
router.put("/teacherApproval/:id" , teacherApproval );
router.put("/studentApproval/:id" , studentApproval );
router.post("/createClass" , createNewClass);
router.post("/createSubejct" , createSubjects);


//fetching class and subjects
router.get("/getAllClass" , getAllClassController);
router.get("/getAllSubject" , getAllSubjectController);

// allocating teacher class and subjects
router.post("/subjectAllocation",createSubjects);











export default router;