import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import "./Series.css";

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

type SeasonGroup = {
  season: string;
  thumbnail: string;
  episodeCount: number;
};

const Series = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [seasonGroups, setSeasonGroups] = useState<SeasonGroup[]>([]);

  useEffect(() => {
    const fetchSeriesVideos = async () => {
      if (!title) return;

      const q = query(collection(db, "00"), where("title", "==", decodeURIComponent(title)));
      const snapshot = await getDocs(q);

      const videos: VideoMeta[] = snapshot.docs.map((doc) => {
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

      // Group videos by season
      const grouped = videos.reduce((acc: { [key: string]: SeasonGroup }, video) => {
        if (!acc[video.season]) {
          acc[video.season] = {
            season: video.season,
            thumbnail: video.thumbnail,
            episodeCount: 0,
          };
        }
        acc[video.season].episodeCount++;
        return acc;
      }, {});

      // Convert to array and sort by season number
      const sortedGroups = Object.values(grouped).sort((a, b) => 
        parseInt(a.season) - parseInt(b.season)
      );

      setSeasonGroups(sortedGroups);
    };

    fetchSeriesVideos();
  }, [title]);

  const handleSeasonClick = (season: string) => {
    navigate(`/season/${encodeURIComponent(title || "")}/${season}`);
  };

  return (
    <div className="series-container" style={{ padding: "20px" }}>
      <h2>🎬 {decodeURIComponent(title || "")}</h2>
      <div className="season-grid">
        {seasonGroups.map((group) => (
          <div
            key={group.season}
            className="season-card"
            onClick={() => handleSeasonClick(group.season)}
          >
            <img
              src={group.thumbnail}
              alt={`Season ${group.season}`}
              className="thumbnail"
            />
            <div className="season-info">
              <p className="season-title">Season {group.season}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series; 