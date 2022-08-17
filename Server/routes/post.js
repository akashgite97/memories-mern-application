import express from 'express';
import { createPost, getPosts, getPost, deletePost, updatePost, likePost, getPostBySearch, commentPost } from '../controllers/posts.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();


//Get: Serch Post
router.get('/search', getPostBySearch);

//GET Post
router.get('/', getPosts);

//GET: Single Post by ID
router.get('/:id', getPost);

//POST: create Route
router.post('/create',isAuthenticated, createPost);

//PUT: Update Route
router.put('/update/:id',isAuthenticated, updatePost);

//Delete: Delete Route
router.delete('/delete/:id',isAuthenticated, deletePost);

//Patch: Like Post Route
router.patch('/:id/like',isAuthenticated, likePost);

//Post: Comment Post Route
router.post('/:id/commentPost',isAuthenticated, commentPost);




export default router;
