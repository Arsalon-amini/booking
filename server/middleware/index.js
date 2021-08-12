import expressJwt from 'express-jwt';
import Hotel from '../models/hotels';
//expressjwt will extract and check APP secret/expiry date from token 
//if valid will give us req.user (default)

export const requireSignIn = expressJwt ({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

export const hotelOwner = async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    let owner = hotel.postedBy._id == req.user._id;
    if (!owner) {
        return res.status(403).send('Unauthorized');
    }
    next();
}

