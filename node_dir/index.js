import express from "express";
const app = express(); // Creates our app using express

const port = 3000; // localhost:3000

import {router as contactRoute} from "./routes/contact.js";

app.use('/contact', contactRoute);

app.listen(port, () => {
    console.log('Server started on port ${port}');
})