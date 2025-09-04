import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    filename: { type: String, required: true }, // GridFS 파일명(고유)
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true }, // GridFS _id
    contentType: { type: String, required: true },
    length: { type: Number, required: true }, // 바이트
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

VideoSchema.index({ createdAt: -1 });
VideoSchema.index({ title: "text", description: "text" });

export default mongoose.model("Video", VideoSchema);
