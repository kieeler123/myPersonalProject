import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import "./Genre.css";

type VideoMeta = {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  thumbnail: string;
  video: string;
  season: string;
  episode: string;
};

const Genre = () => {
  const { genreId } = useParams();
  const [videos, setVideos] = useState<VideoMeta[]>([]);

  useEffect(() => {
    const fetchGenreVideos = async () => {
      if (!genreId) return;

      const q = query(collection(db, "00"), where("genre", "==", genreId));
      const snapshot = await getDocs(q);

      const result: VideoMeta[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          subtitle: data.subtitle,
          genre: data.genre,
          thumbnail: data.thumbnail,
          video: data.video,
          season: data.season,
          episode: data.episode,
        };
      });

      setVideos(result);
    };

    fetchGenreVideos();
  }, [genreId]);

  return (
    <div
      className="genre-container"
      style={{
        padding: "20px",
      }}
    >
      <h2>🎬 장르: {genreId}</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            onClick={() => (window.location.href = `/watch/${video.id}`)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="thumbnail"
            />
            <p>
              {video.title}.S{video.season}.E{video.episode}
            </p>
            <span>{video.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
