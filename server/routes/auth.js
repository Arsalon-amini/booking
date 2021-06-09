import express from 'express'; 

const router = express.Router(); //gives access to express router

//controllers
import {showMessage} from '../controllers/auth';

router.get('/:message', showMessage);

module.exports = router;