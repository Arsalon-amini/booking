import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn } from '../middleware'
const router = express.Router();

import { create } from '../controllers/hotel';
router.post("/create-hotel", formidable (), create);


module.exports = router; 