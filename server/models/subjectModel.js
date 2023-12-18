import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName:{
        type:String,
        required:[true,"Subject name is required"]
    },
    description:{
        type:String
    }

},{timestamps:true})

const subjectModel= mongoose.model("subject",subjectSchema);
export default subjectModel;