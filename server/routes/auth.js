import express from 'express'; 

const router = express.Router(); //gives access to express router

//controllers
import { register } from '../controllers/auth';


router.post('/register', register);

module.exports = router;