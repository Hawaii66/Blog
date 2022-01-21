import monk, { ICollection } from "monk";
require("dotenv").config();

if(process.env.MONGO_DB_URI === undefined){
    console.log("EXIT PROCESS NO CONNECTING TO DB");
    process.exit();
}

export const db = monk(process.env.MONGO_DB_URI);
export const users:ICollection = db.get("users");
export const tokens:ICollection = db.get("tokens");
export const blogs:ICollection = db.get("blogs");