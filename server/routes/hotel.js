import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn } from '../middleware'
const router = express.Router();

import { create, hotels, image, sellerHotels } from '../controllers/hotel';
router.post("/create-hotel", formidable (), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image); 
router.get('/sellter-hotels', requireSignIn, sellerHotels); 

module.exports = router; 