import expressJwt from 'express-jwt'

export const requireSignIn = expressJwt ({
    //expressjwt will extract and check APP secret/expiry date from token 
    //if valid will give us req.user (default)
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

