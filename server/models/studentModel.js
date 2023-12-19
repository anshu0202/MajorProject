import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    classList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',  // Replace with the actual model name for classes
        }
    ],
    address: {
        type: String,
    }
}, { timestamps: true });

const studentModel = mongoose.model('student', studentSchema);

export default studentModel;
