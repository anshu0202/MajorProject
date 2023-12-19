import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: {
        type: String,
        required: [true, "Class name is required."],
    },
    subjectList: [{
        _id: false, 
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            _id: false, 
            
            // required: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'teacher',
            _id: false, 
        
            required: false,
        },
    }],
   
}, );

export default mongoose.model('class', classSchema);
