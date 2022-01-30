import { createContext } from "react";
import { User } from "../Interfaces/UserInterface";

interface UserContextInterface {
    user:User|null,
    setUser:(user:User)=>void,
    accessToken:string,
    refreshToken:()=>Promise<string>
}

export const UserContext = createContext<UserContextInterface>(
    {
        user:null,
        setUser:(user)=>{
            console.log(user);
        },
        accessToken:"",
        refreshToken:()=>new Promise(()=>"")
    }
);