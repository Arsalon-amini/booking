import express from "express"; //using esm for import and export syntax
import router from './routes/auth';

const app = express(); //express API encapsulated in app variable

//route middleware
app.use('/api', router); 

app.listen(8000, () => console.log(`server running on port 8000`));