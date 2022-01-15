import {Express, Request, Response} from "express";

const multer = require("multer");
const upload = multer({dest:"uploads/"});
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../Utils/S3");

export const Routes = (app:Express) => {
    app.get("/", (req:Request, res:Response)=>{
        res.status(200).json({
            status:"Server online",
            message:"Hello World!"
        })
    });

    app.post("/images", upload.single("image"), async (req:any, res:Response) => {
        const file = req.file;
        //const body = req.body;

        const result = await uploadFile(file);

        await unlinkFile(file.path);

        res.status(200).json({
            filePath:`/images/${result.key}`
        });
    });

    app.get("/images/:id", async (req:any,res:Response)=>{
        const key = req.params.id;
        const readStream = getFileStream(key);

        readStream.pipe(res);
    });
}