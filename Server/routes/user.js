import express from 'express';
import { signin, signup } from '../controllers/user.js';


const router = express.Router();

//POST: signin
router.post('/signin', signin);

//POST: signup
router.post('/signup', signup);


//Get: Get all users
router.get('/usersList', signup);

export default router