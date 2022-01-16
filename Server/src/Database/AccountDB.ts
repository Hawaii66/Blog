import { User } from "../Interfaces/UserInterface";
import {db, users} from "./DatabaseAPI";

//type GetUserType = (accountID: string)=> Promise<User|null>
//type AddUserType = (user:User) =>Promise<User|null>

type UserIDType = (id:string) => Promise<boolean>
type CreateUserType = (user:User) => Promise<User>
type GetUserType = (id:string) => Promise<User|null>

/*export const GetUser:GetUserType = async (accountID: string)=>{
    var dbAccount:User = await users.findOne({accountID: accountID.toString()});
    if (dbAccount === null){
        return null;
    }

    return dbAccount;
}

export const AddUser:AddUserType = async (user:User)=>{
    let potentialUser:User | null = await GetUser(user.accountID);
    if(potentialUser !== null){
        return potentialUser;
    }

    potentialUser = await users.insert(user);
    return potentialUser;
    return null;
}*/

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