const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 가상의 데이터베이스 역할을 할 배열
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

// 게시물 목록 조회
app.get('/posts', (req, res) => {
  res.send(posts);
});

// 게시물 생성
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content, comments: [] }; // 댓글을 저장할 배열 추가
  posts.push(newPost);
  res.send('게시물이 성공적으로 생성되었습니다.');
});

// 댓글 생성
app.post('/posts/:id/comments', (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  posts[id].comments.push(comment);
  res.send('댓글이 성공적으로 작성되었습니다.');
});

// 정적 파일 제공 (부트스트랩 CSS)
app.use(express.static('public'));

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
