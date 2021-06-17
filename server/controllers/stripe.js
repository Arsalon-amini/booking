import User from '../models/user'; 
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
    console.log("Outcome of middleware fn expressJwt", req.user)
    console.log("You hit create connect endpoint");
    // find user from DB
    const user = await User.findById(req.user._id).exec();
    console.log("user", user); 
    // if user doesn't have a stripe_account_id, create
    const account = await stripe.accounts.create({
        type: "express"
    });
    console.log("account", account); 
    // create account link
    // update payment schedule 
}