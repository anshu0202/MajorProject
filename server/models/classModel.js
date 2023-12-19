import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: {
        type: String,
        required: [true, "Class name is required."],
    },
    subjectList: [{
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            // required: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'teacher',
            // required: true,
        },
    }],
});

export default mongoose.model('class', classSchema);
