import express from 'express'; 

const router = express.Router(); //gives access to express router

//controllers
import { register, login } from '../controllers/auth';


router.post('/register', register);
router.post('/login', login); 

module.exports = router;