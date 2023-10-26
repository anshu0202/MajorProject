import express from "express";
import upload from "../middlewares/multer.js";
import { assignmentUploadController, endLiveClassController, getAllAssignmentController, getAllNotesController, getAllPyqController, liveClassController, notesUploadController, pyqUploadController } from "../controllers/teacherController.js";

const router = express.Router();



router.post('/startClass', liveClassController)

router.delete('/endClass/:id', endLiveClassController);

router.post('/notes/upload', upload.single('file'), notesUploadController);
router.post('/pyq/upload', upload.single('file'), pyqUploadController);
router.post('/assignment/upload', upload.single('file'), assignmentUploadController);

router.get('/getAllAssignment/:tid/:cid',getAllAssignmentController);
router.get('/getAllPyqs/:tid/:cid',getAllPyqController);
router.get('/getAllNotes/:tid/:cid',getAllNotesController);




export default router;