import mongoose from "mongoose";


const newStudentSchema = new mongoose.Schema({

    fname:{
        type:String,
        // required:true,
        trim:true
    },
    lname:{
        type:String,
        // required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        // required:true

    },
    address:{
        type:String,
        // required:true
    },

    role:{
        type:Number,
        default:1
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
    }
    
},
{timestamps:true}
);

export default mongoose.model('newStudent' , newStudentSchema);