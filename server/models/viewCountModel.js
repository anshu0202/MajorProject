import mongoose from "mongoose";


const viewAssignmentSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    assignmentID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }



}, {
    timestamps:true
})

export default mongoose.model('viewAssignment', viewAssignmentSchema)