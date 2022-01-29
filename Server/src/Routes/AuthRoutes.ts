import {Express, Request, Response, NextFunction} from "express";
import { users } from "../Database/DatabaseAPI";
import { CreateUser, GetAllUsers, GetUser, GetUserEmail, GetUserMicrosoftID, HasToken, RemoveToken, SetToken, UserIDExists } from "../Database/AccountDB";
import { TokenUser, User } from "../Interfaces/UserInterface";
import { SearchUserNames } from "../Utils/TextSearch";
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

export const AuthRoutes = (app:Express) => {
    app.post("/users/create", async(req,res)=>{
        try{
            const hashedID = await GetHashedMicrosoftID(req.body.microsoftID);

            var user:User = {
                blogs:[],
                email:req.body.email,
                id: await GetRandomUserID(),
                images:[],
                microsoftID:hashedID,
                name:req.body.name
            }

            if(await GetUserEmail(user.email) !== null)
            {
                return res.status(400).send("User already exists");
            }

            user = await CreateUser(user);
            return res.status(201).json(user);
        } catch {
            return res.status(500).send("Error creating user")
        }
    });

    app.get("/users/search/:query",async(req,res)=>{
        const query = req.params.query;
        if(query === null){return res.status(400).send("No query string found");}

        const allUsers = await GetAllUsers();
        if(allUsers === null){return res.status(500).send("Internal server error, no blogs found");}

        const users = SearchUserNames(allUsers, query);

        var send:{name:string,id:string}[] = []
        for(var i = 0; i < users.length; i ++){
            send.push({
                name:users[i].name,
                id:users[i].id
            });
        }

        res.status(200).json(send);
    });

    app.get("/users/get/name/:id",async(req,res)=>{
        const id = req.params.id;
        const user = await GetUser(id);
        if(user === null){return res.status(400).send("No user found with Id: "+id);}
        
        return res.status(200).json(
            {
                name:user.name
            }
        );
    });

    app.get("/users/blogs/:id", async(req,res)=>{
        const id = req.params.id;
        const user = await GetUser(id);
        if(user === null){return res.status(400).send("No user found with Id: "+id);}

        return res.status(200).json(
            {
                name:user.name,
                blogs:user.blogs
            }
        );
    });

    app.get("/users/test",AuthToken, (req,res)=>{
        res.status(200).send("Found user");
    });

    app.get("/users/get",AuthToken, async(req,res)=>{
        const user:User|null = await users.findOne({microsoftID:req.id});
        res.status(200).json(user);
    });

    app.get("/users/get/images/:id", async(req,res)=>{
        const user:User|null = await GetUser(req.params.id);
        
        if(user === null){return res.status(500).send("No user found");}

        res.status(200).json(user.images);
    });

    app.delete("/users/delete", async (req,res)=>{
        await RemoveToken(req.body.token);
        res.sendStatus(204);
    });

    app.post("/users/token", async(req,res)=>{
        const refreshToken = req.body.token;
        if(refreshToken === null){return res.sendStatus(401);}
        if(!await HasToken(refreshToken)){return res.sendStatus(403);}

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any,user:any)=>{
            if(err){return res.sendStatus(403);}

            const tokenUser:TokenUser = {
                microsoftID:user.microsoftID
            }

            const accessToken = GenerateAccessToken(tokenUser);
            res.status(200).json({accessToken:accessToken});
        });
    });

    app.post("/users/login/microsoft",async(req,res)=>{
        const user = await GetUserEmail(req.body.email);
        if(user === null)
        {
            return res.status(400).send("No user found with that ID");
        }

        try{
            if(await bcrypt.compare(req.body.microsoftID, user.microsoftID)){
                const tokenUser:TokenUser = {
                    microsoftID:user.microsoftID
                }
                const accessToken = GenerateAccessToken(tokenUser);
                const refreshToken = CreateJWT(tokenUser);

                await SetToken(refreshToken);

                return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken});
            }else{
                return res.status(400).send("Wrong auth");
            }
        }catch{
            return res.status(500).send("Error logging in")
        }
    });
}

function CreateJWT(user:TokenUser):string {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

export function AuthToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"];
    if(authHeader && authHeader.split(" ")[0] !== "Bearer"){
        return res.status(400).send("Not a bearer token");
    }
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null || token === undefined){return res.sendStatus(401);}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any,user:any)=>{
        if(err) {
            return res.sendStatus(403);
        }

        req.id = user.microsoftID;
        next()
    });
}

export function GenerateAccessToken(user:TokenUser) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
}

async function GetRandomUserID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";

    while(!await UserIDExists(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";
    }

    return randomID;
}

async function GetHashedMicrosoftID(id:string):Promise<string> {
    return await bcrypt.hash(id, 10);
}