import express from 'express'; 
import {requireSignIn} from "../middleware/index"; 
import { createConnectAccount, getAccountStatus } from "../controllers/stripe"; 

const router = express.Router(); 

router.post("/create-connect-account", requireSignIn, createConnectAccount); 
router.post('/get-account-status', requireSignIn, getAccountStatus);

module.exports = router; 