// 간단한 Node.js + Express 블로그 템플릿

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const POSTS_DIR = path.join(__dirname, 'posts');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 홈 페이지 - 글 목록
app.get('/', (req, res) => {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = files.map(filename => {
    const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
    return {
      title: filename.replace('.txt', ''),
      content: content.slice(0, 100) + '...'
    };
  });
  res.render('index', { posts });
});

// 새 글 작성 폼
app.get('/new', (req, res) => {
  res.render('new');
});

// 새 글 업로드
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.send('제목과 내용을 모두 입력하세요.');
  fs.writeFileSync(path.join(POSTS_DIR, `${title}.txt`), content);
  res.redirect('/');
});

// 글 상세 보기
app.get('/post/:title', (req, res) => {
  const filePath = path.join(POSTS_DIR, `${req.params.title}.txt`);
  if (!fs.existsSync(filePath)) return res.send('글을 찾을 수 없습니다.');
  const content = fs.readFileSync(filePath, 'utf-8');
  res.render('post', { title: req.params.title, content });
});

app.listen(PORT, () => {
  console.log(`블로그 실행 중: http://localhost:${PORT}`);
});