import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 
const {Schema} = mongoose; 

const userSchema = new Schema({
    name: {
        type: String,
        trim: true, 
        required: 'Name is Required'
    },
    email: {
        type: String,
        trim: true, 
        required: 'Email is Required',
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
},
    {timestamps: true}
); 

userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function (err, hash){
            if(err){
                console.log('BCRYPT HASH ERR', err); 
                return next(err); 
            }
            user.password = hash; 
            return next();
        });
    } else {
        return next(); 
    }
});

userSchema.methods.comparePassword = function (password, next){
    bcrypt.compare(password, this.password, function(err, match){
        if(err){
            console.log("Compare Password error", err);
            return next(err, false);
        }
        console.log("Match password", match);
        return next(null, match); 
    });
};



export default mongoose.model('User', userSchema); 