import Hotel from '../models/hotels'; 
import fs from 'fs';

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let hotel = new Hotel(fields);
        if (files.image) {
            hotel.image.data = fs.readFileSync(files.image.path); //give image path to fn, gives image data
            hotel.image.contentType = files.image.type;
        }

        hotel.save((err, result) => {
            if (err) {
                console.log('saving hotel err', err);
                res.status(400).send("error saving"); 
            }
            res.json(result); //saved hotel in db available in client as a response

        }
    )
            

    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

export const hotels = async (req, res) => {
    let allHotels = await Hotel.find({})
        .limit(24)
        .select("-image.data")
        .populate('postedBy', '_id name') //returns original data from userSchema via the reference in our HotelSchema
        .exec();
    console.log(allHotels);
    res.json(allHotels); //send hotels to frontEnd
};

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set('Content-Type', hotel.image.contentType)
        return res.send(hotel.image.data);
    }

}

export const sellerHotels = async (req, res) => {
    let all = await Hotel.find({ postedBy: req.user._id })
        .select('-image.data')
        .populate('postedBy', '_id name')
        .exec(); 
    
    res.send(all); 
}