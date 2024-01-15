import express from "express";
import upload from "../middlewares/multer.js";
import { assignmentUploadController, checkUserInView, endLiveClassController, getAllAssignmentController, getAllNotesController, getAllPyqController, getAllTeacherClassController, getTeacherInfoController, increaseCountController, liveClassController, notesUploadController, pyqUploadController, teacherLogin } from "../controllers/teacherController.js";

const router = express.Router();


router.post("/login", teacherLogin);

router.post('/startClass', liveClassController)

router.delete('/endClass/:id', endLiveClassController);

router.post('/notes/upload', upload.single('file'), notesUploadController);
router.post('/pyq/upload', upload.single('file'), pyqUploadController);
router.post('/assignment/upload', upload.single('file'), assignmentUploadController);

// router.get('/getAllAssignment/:tid/:cid',getAllAssignmentController);
router.get('/getAllAssignment',getAllAssignmentController);


router.get('/checkUserViewAssignment/:userID/:assignmentID',  checkUserInView);



router.get('/increaseCount/:id',  increaseCountController);

// router.get('/getAllPyqs/:tid/:cid',getAllPyqController);
router.get('/getAllPyqs',getAllPyqController);



// router.get('/getAllNotes/:tid/:cid',getAllNotesController);
router.get('/getAllNotes',getAllNotesController);

router.get("/getAllClass/:tid", getAllTeacherClassController);

router.get("/getTeacherInfo/:tid",getTeacherInfoController);












export default router;