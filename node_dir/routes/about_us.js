import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
export const router = express.Router();
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const head_shots = "static/assets/headshots/";

router.get("/", (req, res) => {
    const members = [];
    
    fs.readdirSync(head_shots).forEach(file => {
        let member = {};
    
        member["name"] = ((file.split(".")[0]).split("@")[0]).split("_").slice(1).join(" ");
        member["title"] = ((file.split(".")[0]).split("@")[1]).split("_").join(" ");
        member["imgref"] = head_shots + file;
        members.push(member);
    });
    // console.log(req.rawHeaders);
    // res.send({data: "Contact us please"});
    // res.sendFile(path.join(__dirname, "../", "templates", "about_us.html"));
    res.render('about_us', { members: members });
});

router.post("/", (req, res) => {
    console.log(req.rawHeaders);
});

router.put("/", (req, res) => {
    console.log(req.rawHeaders);
});

router.delete("/", (req, res) => {
    console.log(req.rawHeaders);
});

export default router;