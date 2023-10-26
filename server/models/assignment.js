const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assignmentSchema = new Schema ({
    fileName: {
        type: String,
        required : true,

    },
    filePath: {
        type: String,
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
        required : true,
        
    },
    assignmenttype: {
        type: String,
        required : true,
        
    },
    faculty: {
        type: String,
        required : true,
        
    },
    credit: {
        type: String,
        required : true,
        
    },
    
    
}, {timestamps:true});

// module.exports = mongoose.model('pyq', assignmentSchema)

export default mongoose.model('assignment',assignmentSchema);
