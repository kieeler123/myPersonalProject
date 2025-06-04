require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const { verifyToken } = require("./middleware/auth");

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // 너의 프론트 주소
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/posts", verifyToken, postRoutes);
app.use("/api/posts", postRoutes); // 인증 제거 테스트

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => console.log("Server running"));
});