import {Express, Request, Response} from "express";

export const Routes = (app:Express) => {
    app.get("/", (req:Request, res:Response)=>{
        res.status(200).json({
            status:"Server online",
            message:"Hello World!"
        })
    });
}