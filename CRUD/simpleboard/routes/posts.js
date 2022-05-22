const { Router } = require('express');
const { Post, User } = require('../models');
const asyncHandler = require('../utils/async-handler');

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  if (req.query.write) {
    res.render('post/edit');
    return;
  }
  
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);
  
  // getPaginatedPosts 사용하기
  const [posts, totalPage] = await Post.getPaginatedPosts({}, page, perPage);
  
  
  res.render('post/list', { posts, page, perPage, totalPage, path: req.baseUrl });
}));

router.get('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const post = await Post.findOne({ shortId }).populate('author');
  
  if (req.query.edit) {
    res.render('post/edit', { post });
    return;
  }
  
  res.render('post/view', { post });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    throw new Error('제목과 내용을 입력 해 주세요');
  }
  
  const author = await User.findOne({shortId : req.user.shortId,});
  
  if(!author){
    throw new Error('No Author');
  }
  // 로그인 된 사용자의 shortId 로 사용자를 찾아 게시글 생성시 작성자로 추가
  const post = await Post.create({ title, content, author });
  res.redirect(`/posts/${post.shortId}`);
}));

router.post('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const { title, content } = req.body;
  
  if (!title || !content) {
    throw new Error('제목과 내용을 입력 해 주세요');
  }
  
  const post = await Post.findOne({ shortId }).populate('author'); // 작성자 populate
  // 작성자와 로그인된 사용자의 shortId 가 다를경우 오류 발생
  
  if(post.author.shortId !== req.user.shortId){
    throw new Error('작성자가 아닙니다.');
  }
  
  await Post.updateOne({ shortId }, { title, content });
  res.redirect(`/posts/${shortId}`);
}));

router.delete('/:shortId', asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  
  const post = await Post.findOne({ shortId }).populate('author'); // 작성자 populate
  // 작성자와 로그인된 사용자의 shortId 가 다를경우 오류 발생
  
  if(post.author.shortId !== req.user.shortId){
    throw new Error('작성자가 아닙니다.');
  }; 
  
  await Post.deleteOne({ shortId });
  res.send('OK');
}));

module.exports = router;