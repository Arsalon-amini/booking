import Hotel from '../models/hotels'; 
import fs from 'fs';

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        
        let hotel = new Hotel(fields);
        hotel.postedBy = req.user._id;
        

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

        })        

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
    console.log(all)
    res.send(all); 
}

export const remove = async (req, res) => {
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId).exec();
    res.json({ ok: true });
}

export const read = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId)
        .select('-image.data')
        .exec();
    console.log(hotel); 
    res.json(hotel);
}

export const update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files; 

        let data = { ...fields };
        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type; 

            data.image = image; 
        }

        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
            new: true
        }).select("-image.data");

        res.json(updated); 

    } catch (error) {
        console.log(error);
        res.status(400).send('Hotel update failed, Try again'); 
    }
}