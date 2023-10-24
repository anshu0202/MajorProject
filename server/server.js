import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import studentRoute from "./routes/studentRoute.js";
import teacherRoute from "./routes/teacherRoute.js";

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
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("/api/v1/student", studentRoute);

//teacher route
app.use("/api/v1/teacher", teacherRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Education-HUB Server!!</h1>");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgCyan.white);
});
