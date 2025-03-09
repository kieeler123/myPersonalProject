const express = require("express");
const router = express.Router();
const db = require("../../firebaseConfig");

const API_KEY = process.env.YOUTUBE_API_KEY; // YouTube API 키 입력

let mainTitle = "VUTUBE";
let searchTitle = "Youtube Search"
router.get("/", async (req, res) => {
    try {
        const collections = await db.listCollections();
        console.log("🔥 Firestore 컬렉션 목록:", collections.map(col => col.id));
        const snapshot = await db.collection("Lesserafim").get();
        console.log("🔥 Firestore 문서 데이터:", snapshot.docs.map(doc => doc.data()));
        const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("🔥 Firestore에서 가져온 데이터:", items); // 터미널에서 확인
  
      res.render("home", { mainTitle, items });
    } catch (error) {
      console.error("❌ Firestore 오류:", error);
      res.status(500).send("서버 오류: " + error.message);
    }
});
router.get("/watch", async (req, res) => {
    const videoId = req.query.id; // 🔥 URL에서 ?id= 가져오기
  
    if (!videoId) {
      return res.status(400).send("잘못된 요청: ID가 필요합니다.");
    }
  
    try {
      const videoDoc = await db.collection("Lesserafim").doc(videoId).get();
  
      if (!videoDoc.exists) {
        return res.status(404).send("영상이 존재하지 않습니다.");
      }
  
      const videoData = videoDoc.data();
      res.render("watch", { mainTitle, video: videoData }); // ✅ watch.pug로 데이터 전달
    } catch (error) {
      console.error("❌ Firestore에서 영상 불러오기 오류:", error);
      res.status(500).send("서버 오류");
    }
});
router.get("/storage", (req, res) => res.render("storage"))

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
      return res.render("youtubeSearch", { mainTitle, searchTitle, videos: [], error: "검색어를 입력하세요." });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
      const axios = require("axios");  // axios를 가져오기
      const response = await axios.get(url);
      const videos = response.data.items.map(item => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url
      }));

      res.render("youtubeSearch", { mainTitle, searchTitle, videos });
  } catch (error) {
      console.error(error);
      res.render("youtubeSearch", { mainTitle, searchTitle, videos: [], error: "검색 중 오류가 발생했습니다." });
  }
});

module.exports = router;