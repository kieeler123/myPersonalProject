import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import devlogRoutes from "./routes/devlogs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/devlogs", devlogRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("MongoDB 연결 성공");
    app.listen(PORT, () =>
      console.log(`서버 실행 중: http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB 연결 실패:", err));
