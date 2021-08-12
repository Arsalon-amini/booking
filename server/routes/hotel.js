import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, hotelOwner } from '../middleware'
const router = express.Router();

import {
    create,
    hotels,
    image,
    sellerHotels,
    remove,
    read
} from '../controllers/hotel';
router.post("/create-hotel", requireSignIn, formidable (), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image); 
router.get('/seller-hotels', requireSignIn, sellerHotels); 
router.delete('/delete-hotel/:hotelId', requireSignIn, hotelOwner, remove);
router.get("/hotels/:hotelId", read);

module.exports = router; 