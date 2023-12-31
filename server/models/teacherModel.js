import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
    },
    email: {
        type: String,
        // required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Invalid email format."
        ],
    },
    password: {
        type: String,
        // required: [true, "Password is required."],
    },
    dob: {
        type: String,
        // required: [true, "Date of birth is required."],
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: "Invalid gender. Must be 'Male', 'Female', or 'Other'.",
        },
    },
    profilePic: {
        type: String,
    },
    phone: {
        type: String,
        match: [
            /^[0-9]{10}$/,
            "Invalid phone number format. It should be a 10-digit number.",
        ],
    },
    address: {
        type: String,
    },
    assignedClasses: [{
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'class',
            required: true,
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
        },
    }],
}, { timestamps: true });

const teacherModel = mongoose.model('teacher', teacherSchema);

export default teacherModel;
