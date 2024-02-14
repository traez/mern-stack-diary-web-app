import express from "express";
import { requireAuth } from '../middleware/auth.js';
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postControllers.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

export default router;
