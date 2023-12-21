import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: [true, "Class id is required"],
    },
    teacherId: { type: String, required: [true, "Teacher id is required"] },
    subjectId: {
      type: String,
      required: [true, "class room id is required"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("liveClass", liveClassSchema);
