import liveClassModel from "../models/liveClassModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// for managing live classes

export const liveClassController = async (req, res) => {
  try {
    

    const { classId, teacherId, classRoomId } = req.body;

    if (!classId || !teacherId || !classRoomId) {
      res.status(400).send("Invalid request");
    }

    const liveClass = await new liveClassModel({
      classId,
      teacherId,
      classRoomId,
    }).save();

    res.status(201).send({
      message: "Class room created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while starting a live class ", error.message);
    res.status(500).send({
      message: "Error while starting a live class",
      success: false,
      error: error.message,
    });
  }
};

export const endLiveClassController = async (req, res) => {
  try {
   
    const id = new ObjectId(req.params.id);

    const deleteClass = await liveClassModel.findByIdAndDelete(id);

    if (!deleteClass) {
      res.status(400).send({
        success: false,
        message: "Class already deleted",
      });
    }

    else{
        res.status(200).send({
            message: "Live class has been ended",
            success: true,
          });
    }


    
  } catch (error) {
    console.log("Error while ending a live class ", error.message);
    res.status(500).send({
      message: "Error while ending a live class",
      success: false,
      error: error.message,
    });
  }
};



