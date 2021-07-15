import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn } from '../middleware'
const router = express.Router();

import { create, hotels } from '../controllers/hotel';
router.post("/create-hotel", formidable (), create);
router.get('/hotels', hotels);

module.exports = router; 