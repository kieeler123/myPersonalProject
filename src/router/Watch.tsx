import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";

const Watch = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) return;

      const docRef = doc(db, "00", id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return;

      const data = snap.data();
      setTitle(data.title || "Untitled");

      const path = data.video || data.videoPath;
      if (!path) return;

      const url = path.startsWith("http")
        ? path
        : await getDownloadURL(ref(storage, path));

      setVideoUrl(url);
    };

    fetchVideo();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{title}</h2>
      {videoUrl ? (
        <video controls autoPlay width="640">
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p>⏳ 비디오 불러오는 중...</p>
      )}
    </div>
  );
};

export default Watch;
