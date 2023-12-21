import express from "express";
import { allocateClassController, createNewClass, createSubjects, deleteStudentReqController, deleteTeacherReqController, getAllClassController, getAllStudentList, getAllStudentReq, getAllSubjectController, getAllTeacherReq, getAllteacherList, getClassByIdController, getSubjectByIdController, studentApproval, teacherApproval } from "../controllers/adminController.js";

const router = express.Router();

router.get("/getStudentReqList" , getAllStudentReq );
router.get("/getTeacherReqList" , getAllTeacherReq );
router.put("/teacherApproval/:id" , teacherApproval );
router.put("/studentApproval/:id" , studentApproval );
router.post("/createNewClass" , createNewClass);
router.post("/createNewSubject" , createSubjects);
router.get("/getAllTeacher" , getAllteacherList);
router.get("/getAllStudent" , getAllStudentList);

// delete apis
router.delete("/deleteStudentReq/:sid" , deleteStudentReqController );
router.delete("/deleteTeacherReq/:tid" , deleteTeacherReqController );



//fetching class and subjects
router.get("/getAllClassList" , getAllClassController);
router.get("/getAllSubjects" , getAllSubjectController);
router.get("/getSubjectById/:subjectId",getSubjectByIdController);
router.get("/getClassById/:classId",getClassByIdController);



// allocating teacher class and subjects
router.post("/teacherClassAllocation",allocateClassController);











export default router;