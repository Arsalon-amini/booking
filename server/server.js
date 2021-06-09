import express from "express"; 
import {readdirSync} from "fs"; 
const morgan = require("morgan"); 
require("dotenv").config();

const app = express(); //express API encapsulated in app variable

//middleware
app.use(morgan("dev")); //run morgan (HTTP request logger) in dev mode

// automatically loads and applies routes as middleware
readdirSync("./routes").map((r) => 
    app.use("/api", require(`./routes/${r}`))
); 

const port = process.env.PORT || 8000; //environment variable from .env file
app.listen(port, () => console.log(`server running on port ${port}`));