import {Express, Request, Response} from "express";
import { CreateUser, GetUser, UserIDExists } from "../Database/AccountDB";
import { User } from "../Interfaces/UserInterface";
const bcrypt = require("bcrypt");

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

    app.post("/users/login/microsoft",async(req,res)=>{
        const user = await GetUser(req.body.id);
        if(user === null)
        {
            return res.status(400).send("No user found with ID: " + req.body.id);
        }

        try{
            if(await bcrypt.compare(req.body.microsoftID, user.microsoftID)){
                console.log("Success logging in");
            }
        }catch{
            res.status(500).send("Error logging in")
        }
    });
}

async function GetRandomUserID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";

    while(!await UserIDExists(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":user";
        console.log(randomID);
    }

    return randomID;
}