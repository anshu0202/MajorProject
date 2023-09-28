import mongoose, { mongo } from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected Successfully ${conn.connection.host}`.bgMagenta.white);


    } catch (error) {
        console.log(`Error while connecting MongoDB ${error}`.bgRed.white)
    }
}

export default connectDB;
