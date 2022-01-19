import {Express, Request, Response, NextFunction} from "express";
import { CreateUser, GetUser, UserIDExists } from "../Database/AccountDB";
import { TokenUser, User } from "../Interfaces/UserInterface";
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

var refreshTokens:string[] = [];

export const AuthRoutes = (app:Express) => {
    app.post("/users/create",async(req,res)=>{
        try{
            const hashedID = await bcrypt.hash(req.body.microsoftID, 10);

            var user:User = {
                blogs:[],
                email:req.body.email,
                id: await GetRandomUserID(),
                images:[],
                microsoftID:hashedID,
                name:req.body.name
            }

            user = await CreateUser(user);
            res.status(201).json(user);
        } catch {
            res.status(500).send("Error creating user")
        }
    });

    app.get("/users/test",AuthToken, (req,res)=>{
        res.send(req.id);
    });

    app.delete("/users/delete",(req,res)=>{
        refreshTokens = refreshTokens.filter(token => token !== req.body.token);
        res.sendStatus(204);
    });

    app.post("/users/token",(req,res)=>{
        const refreshToken = req.body.token;
        if(refreshToken === null){return res.sendStatus(401);}
        if(!refreshTokens.includes(refreshToken)){return res.sendStatus(403);}

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any,user:any)=>{
            if(err){return res.sendStatus(403);}

            const tokenUser:TokenUser = {
                id:user.id,
                microsoftID:user.microsoftID
            }

            const accessToken = GenerateAccessToken(tokenUser);
            res.status(200).json({accessToken:accessToken});
        });
    });

    app.post("/users/login/microsoft",async(req,res)=>{
        const user = await GetUser(req.body.id);
        if(user === null)
        {
            return res.status(400).send("No user found with ID: " + req.body.id);
        }

        try{
            if(await bcrypt.compare(req.body.microsoftID, user.microsoftID)){
                console.log("Success logging in");

                //const accessToken = CreateJWT(req);
                const tokenUser:TokenUser = {
                    microsoftID:req.body.microsoftID,
                    id:req.body.id
                }
                const accessToken = GenerateAccessToken(tokenUser);
                const refreshToken = CreateJWT(tokenUser);

                refreshTokens.push(refreshToken);

                res.status(200).json({accessToken:accessToken,refreshToken:refreshToken});
            }else{
                res.status(400).send("Wrong auth");
            }
        }catch{
            res.status(500).send("Error logging in")
        }
    });
}

function CreateJWT(user:TokenUser):string {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}


export function AuthToken(req:Request,res:Response,next:NextFunction){
    console.log("test");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if(token === null || token === undefined){return res.sendStatus(401);}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any,user:any)=>{
        if(err) {
            return res.sendStatus(403);
        }
        console.log(err);
        
        console.log(user);
        req.id = user.id;
        next()
    });
}

export function GenerateAccessToken(user:TokenUser) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15s"});
}

async function GetRandomUserID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";

    while(!await UserIDExists(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";
        console.log(randomID);
    }

    return randomID;
}