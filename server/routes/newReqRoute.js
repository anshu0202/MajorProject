import express from "express";
import { newStudentController, newTeacherController } from "../controllers/newReqController.js";

const  router  = express.Router();



router.post("/newTeacherRegister", newTeacherController);
router.post("/newStudentRegister", newStudentController);




export default router
