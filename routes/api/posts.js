const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth, //authentication sends a req.user.id
    [check('text', 'Text is required').notEmpty()], //only input by user
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const savedPost = await newPost.save(); //<--- we can save objects on DB and on a VAR

      res.json(savedPost);
    } catch (err) {
      console.error(err.msg);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server error');
  }
});

// @route   GET/posts/:post_id
// @desc    Get post by id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }
    res.json(post);
  } catch (err) {
    if (err.name == 'CastError') {
      console.error(err.msg);
      return res.status(404).json({ msg: 'Post does not exist' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE/posts/:post_id
// @desc    DELETE post by id
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist.' });
    }
    //check if user is the author of post
    if (req.user.id !== post.user.toString() || !post) {
      return res.status(401).send('Unauthorized action.');
    }
    await post.remove();
    res.json({ msg: 'Post deleted!' });
  } catch (err) {
    console.error(err.msg);
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post does not exist.' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Add or remove like from post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
  const userActive = req.user.id;
  const post = req.params.post_id;
  try {
    const postLiked = await Post.findById(post);
    //check if post exists
    if (!postLiked) {
      return res.status(404).json({ msg: 'Post does not exist.' });
    }
    //extract all user IDs that liked the post
    let usersLiked = postLiked.likes.map((like) => like.user.toString());
    //check if user already liked post = remove from list
    if (usersLiked.includes(userActive)) {
      indexToRemove = usersLiked.indexOf(userActive);
      postLiked.likes.splice(indexToRemove, 1);
      res.json(postLiked.likes);
      //else = add to list
    } else {
      postLiked.likes.unshift({ user: userActive });
      res.json(postLiked.likes);
    }
    await postLiked.save();
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Comment on an post, by its ID
// @access  Private
router.post(
  '/comment/:post_id',
  [
    auth, //authentication sends a req.user.id
    [check('text', 'Text is required').notEmpty()], //only input by user
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      // console.log('======================================');
      // console.log(user);
      const post = await Post.findById(req.params.post_id);
      // console.log('======================================');
      // console.log(post);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      // console.log('======================================');
      // console.log(newComment);
      post.comments.unshift(newComment);
      // console.log('======================================');
      // console.log(post);
      await post.save(); //<--- we can save objects on DB and on a VAR
      res.json(post.comments);
    } catch (err) {
      console.log('this is what happened');
      console.error(err.msg);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE/posts/comment/:post_id/:comment_id
// @desc    DELETE post by id
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  let postId = req.params.post_id;
  let commentId = req.params.comment_id;
  let userActive = req.user.id;
  try {
    const post = await Post.findById(postId);
    //check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist.' });
    }
    //select comment
    let commentToDelete = post.comments.find((c) => c._id.toString() === commentId);
    //check if comment exists
    if (!commentToDelete) {
      return res.status(404).json({ msg: 'Comment does not exist.' });
    }
    //check if user is the author of comment
    if (userActive !== commentToDelete.user.toString()) {
      return res.status(401).send('Unauthorized action.');
    }
    //check what index in comment array to remove
    const indexToRemove = post.comments.map((c) => c.id.toString()).indexOf(commentId);
    post.comments.splice(indexToRemove, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.msg);
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post does not exist.' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
