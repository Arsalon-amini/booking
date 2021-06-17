import express from 'express'; 
import {requireSignIn} from "../middleware/index"; 
import { createConnectAccount } from "../controllers/stripe"; 

const router = express.Router(); 

router.post("/create-connect-account", requireSignIn, createConnectAccount); 

module.exports = router; 