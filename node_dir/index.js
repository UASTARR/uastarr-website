import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
export const router = express.Router();
const app = express(); // Creates our app using express

// const http = require('node:http');
import http from 'node:http';
const hostname = '127.0.0.1';
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {router as contactRoute} from "./routes/contact.js";
import {router as aboutRoute} from "./routes/about_us.js";
import {router as baseRoute} from "./routes/base.js";
import {router as photosRoute} from "./routes/photo_albums.js";
import {router as projectsRoute} from "./routes/projects.js";
import {router as sponsorsRoute} from "./routes/sponsors.js";

app.use('/join', contactRoute);
app.use('/about-us', aboutRoute);
app.use('/base', baseRoute);
app.use('/photo-albums', photosRoute);
app.use('/projects', projectsRoute);
app.use('/sponsors', sponsorsRoute);


app.get("/", (req, res) => {
    // console.log(req.rawHeaders);
    // res.send({data: "Contact us please"});
    res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`); 
    console.log(`or running at http://localhost:${port}/`); //http://localhost:3000/
})