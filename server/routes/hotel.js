import express from 'express';
import formidable from 'express-formidable';
import { requireSignIn, hotelOwner } from '../middleware'
import {
    create,
    hotels,
    image,
    sellerHotels,
    remove,
    read, 
    update
} from '../controllers/hotel';
const router = express.Router();

router.post("/create-hotel", requireSignIn, formidable (), create);
router.get('/hotels', hotels);
router.get('/hotel/image/:hotelId', image); 
router.get('/seller-hotels', requireSignIn, sellerHotels); 
router.delete('/delete-hotel/:hotelId', requireSignIn, hotelOwner, remove);
router.get("/hotel/:hotelId", read);
router.put("/update-hotel/:hotelId", requireSignIn, formidable(), update);

module.exports = router; 