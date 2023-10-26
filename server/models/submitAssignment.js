const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const submitAssignment = new Schema ({
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
    date: {
        type: Date,
        required: true
      },
    credit: {
        type: String,
        required : true,
        
    },
    
    
}, {timestamps:true});


module.exports = mongoose.model('submitAssignment',submitAssignment);