const express = require("express");
const router = express.Router();
const db = require("../../firebaseConfig");

let title = "VUTUBE";
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
  
      res.render("home", { title: title, items });
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
      res.render("watch", { title: title, video: videoData }); // ✅ watch.pug로 데이터 전달
    } catch (error) {
      console.error("❌ Firestore에서 영상 불러오기 오류:", error);
      res.status(500).send("서버 오류");
    }
});

module.exports = router;