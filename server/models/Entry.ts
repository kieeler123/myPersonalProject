import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// 인덱스 정의 (텍스트 + 날짜)
entrySchema.index({ title: "text", description: "text", tags: "text" });
entrySchema.index({ createdAt: 1 });

export default mongoose.models.Entry || mongoose.model("Entry", entrySchema);
