import express from 'express'; 
import {requireSignIn} from "../middleware/index"; 
import { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId } from "../controllers/stripe"; 


const router = express.Router(); 

router.post("/create-connect-account", requireSignIn, createConnectAccount); 
router.post('/get-account-status', requireSignIn, getAccountStatus);
router.post('/get-account-balance', requireSignIn, getAccountBalance);
router.post('/payout-setting', requireSignIn, payoutSetting);
router.post('/stripe-session-id', requireSignIn, stripeSessionId);

module.exports = router; 