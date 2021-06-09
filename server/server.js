import express from "express"; 
import {readdirSync} from "fs"; 

const app = express(); //express API encapsulated in app variable

//route middleware - automatically loads and applies routes as middleware
readdirSync("./routes").map((r) => 
    app.use("/api", require(`./routes/${r}`))
); 

app.listen(8000, () => console.log(`server running on port 8000`));