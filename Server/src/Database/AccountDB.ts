import { PrivateDnsNameOptionsRequest } from "aws-sdk/clients/ec2";
import { User } from "../Interfaces/UserInterface";
import {db, tokens, users} from "./DatabaseAPI";

//type GetUserType = (accountID: string)=> Promise<User|null>
//type AddUserType = (user:User) =>Promise<User|null>

type UserIDType = (id:string) => Promise<boolean>
type CreateUserType = (user:User) => Promise<User>
type GetUserType = (id:string) => Promise<User|null>
type SetRefreshTokenType = (token:string) => Promise<void>;
type HasRefershTokenType = (token:string) => Promise<boolean>;
type RemoveRefreshTokenType = (token:string) => Promise<void>;

export const CreateUser:CreateUserType = async (user:User) => {
    var newUser:User = await users.insert(user);
    console.log(newUser);
    return newUser;
}

export const GetUser:GetUserType = async (id:string) => {
    var user:User = await users.findOne({id:id.toString()});
    if(user === null){
        return null;
    }
    return user;
}

export const UserIDExists:UserIDType = async (id:string) => {
    let potentialUser:User | null = await users.findOne({id:id.toString()});
    if(potentialUser === null){
        return true;
    }

    return false;
}

export const SetToken:SetRefreshTokenType = async (token:string) => {
    if(!await HasToken(token)){
        await tokens.insert({token:token.toString()});
    }
    return;
}

export const HasToken:HasRefershTokenType = async (token:string) => {
    var result:{token:string} = await tokens.findOne({token:token.toString()});
    return result !== null;
}

export const RemoveToken:RemoveRefreshTokenType = async (token:string) => {
    await tokens.findOneAndDelete({token:token.toString()});
}