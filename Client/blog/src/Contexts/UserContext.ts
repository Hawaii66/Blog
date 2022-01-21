import { createContext } from "react";
import { User } from "../Interfaces/UserInterface";

interface UserContextInterface {
    user:User|null,
    accessToken:string,
    refreshToken:()=>Promise<string>
}

export const UserContext = createContext<UserContextInterface>(
    {
        user:null,
        accessToken:"",
        refreshToken:()=>new Promise(()=>"")
    }
);