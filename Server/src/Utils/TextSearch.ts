import { BlogInterface } from "../Interfaces/BlogInterface";
import { User } from "../Interfaces/UserInterface";

type SearchStringType = (text:string,query:string) => boolean;
type SearchUserNames = (users:User[],query:string) => User[];
type SearchBlogNames = (users:BlogInterface[],query:string) => BlogInterface[];

export const SearchString:SearchStringType = (text,query) => {
    text = text.toLocaleLowerCase();
    query = query.toLocaleLowerCase();
    return text.includes(query);
}

export const SearchUserNames:SearchUserNames = (users, query) => {
    var returnUsers = [];
    for(var i = 0; i < users.length; i ++){
        if(SearchString(users[i].name, query)){
            returnUsers.push(users[i]);
        }
    }

    return returnUsers;
}

export const SearchBlogNames:SearchBlogNames = (blogs, query) => {
    var returnUsers = [];
    for(var i = 0; i < blogs.length; i ++){
        if(SearchString(blogs[i].title, query)){
            returnUsers.push(blogs[i]);
        }
    }

    return returnUsers;
}