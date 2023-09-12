import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// config env 
dotenv.config();

// connect database 
connectDB();

//rest obj
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes 
app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/category" , categoryRoutes);
app.use("/api/v1/product" , productRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to E-comm Server!!</h1>")
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})