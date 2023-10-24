import express from "express";
import { endLiveClassController, liveClassController } from "../controllers/teacherController.js";

const router=express.Router();



router.post('/startClass',liveClassController)

router.delete('/endClass/:id',endLiveClassController);


export default router;