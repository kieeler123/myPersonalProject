import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import "./Season.css";

type VideoMeta = {
  id: string;
  reel: string;
  title: string;
  subtitle: string;
  genre: string;
  thumbnail: string;
  video: string;
  season: string;
  episode: string;
  actor: string;
};

const Season = () => {
  const { title, season } = useParams();
  const [videos, setVideos] = useState<VideoMeta[]>([]);

  useEffect(() => {
    const fetchSeasonVideos = async () => {
      if (!title || !season) return;

      const q = query(
        collection(db, "00"),
        where("title", "==", decodeURIComponent(title)),
        where("season", "==", season)
      );
      const snapshot = await getDocs(q);

      const result: VideoMeta[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          reel: data.reel,
          title: data.title,
          subtitle: data.subtitle,
          genre: data.genre,
          thumbnail: data.thumbnail,
          video: data.video,
          season: data.season,
          episode: data.episode,
          actor: data.actor,
        };
      });

      // Sort videos by episode number
      result.sort((a, b) => parseInt(a.episode) - parseInt(b.episode));

      setVideos(result);
    };

    fetchSeasonVideos();
  }, [title, season]);

  return (
    <div className="season-container" style={{ padding: "20px" }}>
      <h2>🎬 {decodeURIComponent(title || "")} - 시즌 {season}</h2>
      <div className="episode-grid">
        {videos.map((video) => (
          <div
            key={video.id}
            className="episode-card"
            onClick={() => (window.location.href = `/watch/${video.id}`)}
          >
            <img
              src={video.thumbnail}
              alt={`${video.title} - E${video.episode}`}
              className="thumbnail"
            />
            <div className="episode-info">
              <p className="episode-title">
                {video.genre === "ani" ? `[${video.reel}]` : null} E{video.episode}
              </p>
              <p className="episode-subtitle">{video.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Season; 