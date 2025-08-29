import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

let db;
const client = new MongoClient(MONGO_URI);

client
  .connect()
  .then(() => {
    db = client.db();
    console.log("✅ MongoDB 연결 성공");
  })
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err.message);
    process.exit(1);
  });

app.get("/api/texts", async (req, res) => {
  try {
    const texts = await db.collection("texts").find().toArray();
    res.json(texts);
  } catch {
    res.status(500).json({ error: "조회 실패" });
  }
});

app.post("/api/texts", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text 필요" });

  try {
    const result = await db.collection("texts").insertOne({ text });
    res.status(201).json(result);
  } catch {
    res.status(500).json({ error: "추가 실패" });
  }
});

app.delete("/api/texts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .collection("texts")
      .deleteOne({ _id: new ObjectId(id) });
    res.json({ success: result.deletedCount > 0 });
  } catch {
    res.status(500).json({ error: "삭제 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
