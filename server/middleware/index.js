import expressJwt from 'express-jwt';

//expressjwt will extract and check APP secret/expiry date from token 
//if valid will give us req.user (default)

export const requireSignIn = expressJwt ({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});

