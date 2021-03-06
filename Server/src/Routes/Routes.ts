import {Express, Request, Response} from "express";
import { UserAddImage } from "../Database/AccountDB";
import { AuthRoutes, AuthToken } from "./AuthRoutes";
import { BlogRoutes } from "./BlogRoutes";

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

    app.post("/images", AuthToken, upload.single("image"), async (req:any, res:Response) => {
        const file = req.file;
        //const body = req.body;
        console.log(process.env.API_WEBSITE);
        const result = await uploadFile(file);
        const filePath = `${process.env.API_WEBSITE}/images/${result.key}`;

        await unlinkFile(file.path);
        await UserAddImage(req.id,filePath);

        res.status(200).json({
            filePath:filePath
        });
    });

    app.get("/images/:id", async (req:any,res:Response)=>{
        const key = req.params.id;
        const readStream = getFileStream(key);

        readStream.pipe(res);
    });

    AuthRoutes(app);
    BlogRoutes(app);
}