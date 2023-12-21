import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'class',
      required: [true, "Class id is required"],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher',
        required: [true, "Teacher id is required"] 
      },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
      required: [true, "class room id is required"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("liveClass", liveClassSchema);
