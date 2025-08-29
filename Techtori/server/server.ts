import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import entryRoutes from "./routes/entryRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/api/entries", entryRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
