import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    hotel: {
        type: ObjectId,
        ref: "Hotel"
    },
    session: {},
    orderedBy: { type: ObjectId, ref: "User" },
}, { timestampes: true }
);

export default mongoose.model('Order', orderSchema); 