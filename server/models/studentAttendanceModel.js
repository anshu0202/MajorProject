import mongoose from "mongoose";


const studentAttendanceSchema= new mongoose.Schema({
    studentId:{
        type:String,
        required:[true,"Student Id is required"]
    },

    classId:{
        type:String,
        required:[true,"Class Id is required"]
    },
    attendanceDates: {
        type: [Date], 
        default: []
    }
})

export default mongoose.model("studentAttendance",studentAttendanceSchema);


