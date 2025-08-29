import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// 라우터
app.use("/api/todos", todoRoutes);

// DB 연결
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
