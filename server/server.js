import express from "express"; 
import {readdirSync} from "fs"; 
import mongoose from "mongoose"; 
import cors from 'cors'
const morgan = require("morgan"); 
require("dotenv").config();

const app = express(); //express API encapsulated in app variable

//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(()=> console.log('DB connected'))
    .catch((err) => console.log('DB connection error', err)); 

//middleware
app.use(cors()); 
app.use(morgan("dev")); //run morgan (HTTP request logger) in dev mode

// automatically loads and applies routes as middleware
readdirSync("./routes").map((r) => 
    app.use("/api", require(`./routes/${r}`))
); 

const port = process.env.PORT || 8000; //environment variable from .env file
app.listen(port, () => console.log(`server running on port ${port}`));