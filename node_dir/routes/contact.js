import express from "express";
import path from "path"
export const router = express.Router();

router.get("/", (req, res) => {
    // console.log(req.rawHeaders);
    // res.send({data: "Contact us please"});
    res.sendFile(path.join(__dirname, "../", "templates", "join.html"));
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