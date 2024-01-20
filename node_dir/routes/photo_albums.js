import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
export const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
    // console.log(req.rawHeaders);
    // res.send({data: "Contact us please"});
    res.sendFile(path.join(__dirname, "../", "templates", "photos.html"));
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