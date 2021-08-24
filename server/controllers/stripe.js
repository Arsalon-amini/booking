import User from '../models/user'; 
import Hotel from '../models/hotels';
import Order from '../models/order';
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
    // find user from DB
    const user = await User.findById(req.user._id).exec();

    if (!user.stripeSession) return; 
    // console.log("user", user); 

    // if user doesn't have a stripe_account_id, create
    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "express"
        });
        console.log("account", account); //stripe returns an account obj. with an id
        user.stripe_account_id = account.id; //set user obj. stripe property to stripe id
        user.save(); //save in db
    }

    // create login link
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,//re-direct user after completing stripe onboarding 
        type: 'account_onboarding'
    }); 
    //prefil any info such as email
    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });

    //to see the accountLink generated -> console.log("accountLink", accountLink);

    //send link to user
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log("login link", link);
    
    res.send(link);
    // update payment schedule 
}

const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule :{
                    delay_days: 7,
                },
            },
        },
    });
    return account; 
};

//gives the updated user (minus password, returns new data immediately)
export const getAccountStatus = async (req, res) => {
    //console.log('GET ACCOUNT STATUS');
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id); 
    //console.log(account); 

    //before updating in our database, get update from stripe on delay days
    const updatedAccount = await updateDelayDays(account.id); 

    const updatedUser = await User.findByIdAndUpdate(
        user._id, 
        {
        stripe_seller: updatedAccount,
        },
        { new: true }
    )
    .select('-password')
    .exec();
    //console.log(updatedUser); 
    res.json(updatedUser); 
};

export const getAccountBalance = async(req, res) => {
    const user = await User.findById(req.user._id).exec(); 

    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        //console.log("Balance ==> ", balance);
        res.json(balance); 
    } catch (err) {
        console.log(err); 
        
    }
}

export const payoutSetting = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();  //query db, get current user

        const loginLink = await stripe.accounts.createLoginLink(
            user.stripe_account_id, 
            {
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
            }
        );
        //console.log("login link for paout settings", loginLink);
        res.json(loginLink); 
    } catch (err) {
        console.log('stripe setting payout error', err); 
    }
}

export const stripeSessionId = async (req, res) => {
    const { hotelId } = req.body;

    const item = await Hotel.findById(hotelId).populate('postedBy').exec();

    const fee = (item.price * 20) / 100;
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: item.title,
            amount: item.price * 100, //in cents
            currency: 'usd',
            quantity: 1
        }],
        payment_intent_data: {
            application_fee_amount: fee * 100,
            transfer_data: {
                destination: item.postedBy.stripe_account_id
            },
        },
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();

    res.send({
        sessionId: session.id
    })
}

export const stripeSuccess = async (req, res) => {
    try {
    //get hotel from req.body
    const { hotelId } = req.body;

    //find currently logged in user
    const user = await User.findById(req.user._id).exec();

    //retrieve stripe session, based on session id saved in user db
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);

    //if session payment is paid, create order
    if (session.payment_status === 'paid') {
        //check if order already exists by querying orders collection
        const orderExist = await Order.findOne({ 'session.id': session.id }).exec();
        if (orderExist) {
            res.json({ success: true }); //send true without creating a duplicate order
        } else {
            //create a new order and save in DB, send the response as true after 
            const newOrder = await new Order({
                hotel: hotelId,
                session,
                orderedBy: user._id
            }).save();

            await User.findByIdAndUpdate(user._id, {
                $set: { stripeSession: {} },
            });
            res.json({ success: true });
        }
    }
    } catch (err) {
        console.log('Stripe Success Err', err);
    }
}