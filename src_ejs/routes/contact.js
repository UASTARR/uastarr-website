import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { addResponse } from "../google_api/api.js";
export const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    // console.log(req.rawHeaders);
    // res.send({data: "Contact us please"});
    // res.sendFile(path.join(__dirname, "../", "templates", "join.html"));
    res.render('base', { page: 'join' });
});

router.post("/", (req, res) => {
    console.log(req.body);
    addResponse([req.body.firstname, req.body.lastname, req.body.email, req.body.subject, req.body.know, req.body.subscribe ? 'true' : 'false', req.body.message]).catch(console.error);
    // console.log(req.rawHeaders);
});

router.put("/", (req, res) => {
    console.log(req.rawHeaders);
});

router.delete("/", (req, res) => {
    console.log(req.rawHeaders);
});

export default router;