import mongoose from 'mongoose';
const {Schema} = mongoose; 

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, 
        required: 'Name is Required'
    },
    name: {
        type: String,
        trim: true, 
        required: 'Email is Required',
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
},
    {timestamps: true}
); 

export default mongoose.model('User', userSchema); 