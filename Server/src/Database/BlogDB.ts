import { BlogInterface } from "../Interfaces/BlogInterface";
import { blogs } from "./DatabaseAPI";

type GetBlogType = (id:string) => Promise<BlogInterface|null>
type BlogExistsType = (id:string) => Promise<boolean>
type CreateBlogType = (blog:BlogInterface) => Promise<BlogInterface>

export const GetBlog:GetBlogType = async (id:string) => {
    const blog:BlogInterface|null = await blogs.findOne({id:id});
    return blog;
}

export const BlogIDExist:BlogExistsType = async (id:string) =>{
    const blog:BlogInterface|null = await blogs.findOne({id:id});
    if(blog === null){
        return true;
    }
    return false;
}

export const CreateBlog:CreateBlogType = async(blog) => {
    blog.id = await GetRandomBlogID();

    blog = await blogs.insert(blog);
    return blog;
}

async function GetRandomBlogID(){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":blog";

    while(!await BlogIDExist(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":blog";
    }

    return randomID;
}
