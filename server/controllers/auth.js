import User from '../models/user'; 
import jwt from 'jsonwebtoken'; 

export const register = async (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;  
    
    //validation
    if(!name) return res.status(400).send('Name is required'); 
    
    if(!password || password.length < 6) 
        return res
            .status(400)
            .send('Password is required and should be min 6 characters long'); 

    let userExist = await User.findOne({ email }).exec(); 
    if(userExist) return res.status(400).send("Email is already taken"); 

    //register
    const user = new User(req.body); 
    try {
        await user.save(); 
        console.log('User created', user);
        return res.json({ ok: true});
    } catch (err) {
        console.log("create user error", err); 
        return res.status(400).send('Something Unexpected happened'); 
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        //check if user with email exists
        let user = await User.findOne({email}).exec();
        //console.log('User Exist', user);
        if(!user) res.status(400).send('User with that email not found');
        //compare password
        user.comparePassword(password, (err, match) => {
            console.log('Compare password in login err', err);
            if(!match || err) return res.status(400).send('Wrong Password');
            //Generate a token, send res to client
            let token = jwt.sign( {_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'} );
            res.json({token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }});
        })
    } catch (err) {
        console.log("Login err", err);
        res.status(400).send("Signin failed"); 
    }
}