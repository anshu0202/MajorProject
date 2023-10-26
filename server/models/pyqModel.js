import mongoose from "mongoose";
const Schema = mongoose.Schema;
const pyqSchema = new Schema ({
    fileName: {
        type: String,
        required : true,

    },
    filePath: {
        type: Object,
        required : true,
        
    },
    fileType: {
        type: String,
        required : true,
        
    },
    fileSize: {
        type: String,
        required : true,
        
    },
    subject: {
        type: String,
        // required : true,
        
    },
    examtype: {
        type: String,
        // required : true,
        
    },
    faculty: {
        type: String,
        // required : true,
        
    },
    credit: {
        type: String,
        required : true,
        
    },
    
    
}, {timestamps:true});

// module.exports = mongoose.model('pyq',pyqSchema)
export default mongoose.model('pyq',pyqSchema);

