import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import SearchBar from "../components/SearchBar";

import "./Genre.css";

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

type GroupedVideo = {
  title: string;
  videos: VideoMeta[];
  thumbnail: string;
};

const Genre = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const [groupedVideos, setGroupedVideos] = useState<GroupedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<GroupedVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGenreVideos = async () => {
      if (!genreId) return;

      const q = query(collection(db, "00"), where("genre", "==", genreId));
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

      // Group videos by title
      const grouped = videos.reduce((acc: { [key: string]: GroupedVideo }, video) => {
        if (!acc[video.title]) {
          acc[video.title] = {
            title: video.title,
            videos: [],
            thumbnail: video.thumbnail,
          };
        }
        acc[video.title].videos.push(video);
        return acc;
      }, {});

      const groupedArray = Object.values(grouped);
      setGroupedVideos(groupedArray);
      setFilteredVideos(groupedArray);
    };

    fetchGenreVideos();
  }, [genreId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredVideos(groupedVideos);
      return;
    }

    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    
    const filtered = groupedVideos.filter((group) => {
      const firstVideo = group.videos[0];
      const searchableText = [
        group.title,
        firstVideo.subtitle,
        firstVideo.actor,
        firstVideo.genre,
        firstVideo.reel
      ].filter(Boolean).join(' ').toLowerCase();

      // 모든 검색어가 포함되어 있는지 확인
      return searchTerms.every(term => searchableText.includes(term));
    });

    setFilteredVideos(filtered);
  };

  const handleVideoClick = (group: GroupedVideo) => {
    if (genreId === "00") {
      // If genre is "00", navigate directly to the first video's watch page
      navigate(`/watch/${group.videos[0].id}`);
    } else {
      // Check if there's only one season
      const seasons = new Set(group.videos.map(video => video.season));
      if (seasons.size === 1) {
        // If only one season, navigate directly to the season page
        navigate(`/season/${encodeURIComponent(group.title)}/${group.videos[0].season}`);
      } else {
        // If multiple seasons, navigate to the series page
        navigate(`/series/${encodeURIComponent(group.title)}`);
      }
    }
  };

  return (
    <div
      className="genre-container"
      style={{
        padding: "20px",
      }}
    >
      <h2>🎬 장르: {genreId}</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="video-grid">
        {filteredVideos.map((group) => (
          <div
            key={group.title}
            className="video-card"
            onClick={() => handleVideoClick(group)}
          >
            <img
              src={group.thumbnail}
              alt={group.title}
              className="thumbnail"
            />
            <p>
              {group.videos[0] ? group.title : null}
            </p>
            <span>{group.videos[0].genre === "00" ? group.videos[0].actor : null}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;