import {Express, Request, Response} from "express";
import { BlogInterface, BlogPreviewInterface } from "../Interfaces/BlogInterface";
import { CreateBlog, GetAllBlogs, GetBlog } from "../Database/BlogDB";
import { AuthToken } from "./AuthRoutes";
import { GetUser, GetUserMicrosoftID, UserAddBlog } from "../Database/AccountDB";
import { blogs } from "../Database/DatabaseAPI";
import { SearchBlogNames } from "../Utils/TextSearch";
import { SortBlogs } from "../Utils/Blogs";

export const BlogRoutes = (app:Express) => {
    app.post("/blog/save",AuthToken,async(req,res)=>{
        const dataBlog = req.body.blog;

        const blog:BlogInterface = {
            author:dataBlog.author,
            content:dataBlog.content,
            id:req.body.id,
            language:dataBlog.language,
            publishDate:dataBlog.publishDate,
            lastUpdated:dataBlog.lastUpdated,
            title:dataBlog.title
        }

        /*const user = await GetUserMicrosoftID(req.body.id)
        if(user === null){return;}
        console.log("Uesr not nukk");
        await UserAddBlog(user.id, blog.id);*/
        
        const newBlog = await blogs.findOneAndUpdate({id:blog.id},{$set:blog});
        res.status(200).json(newBlog);
    });

    app.get("/blog/search/:query", async(req,res)=>{
        var query = req.params.query;
        if(query === null){return res.status(400).send("No query string found");}

        var allBlogs = await GetAllBlogs();
        if(allBlogs === null){return res.status(500).send("Internal server error: No blogs found");}

        var blogs = SearchBlogNames(allBlogs, query);
        var send:{name:string,id:string}[] = []
        for(var i = 0; i < blogs.length; i ++){
            send.push({
                name:blogs[i].title,
                id:blogs[i].id
            });
        }

        res.status(200).json(send);
    });

    app.get("/blog/last/:start/:end",async(req,res)=>{
        const start = req.params.start;
        const end = req.params.end;

        var blogs = await GetAllBlogs();
        if(blogs === null){return res.status(500).send("No blogs found")}
        blogs = SortBlogs(blogs);
        blogs.reverse();
        blogs = blogs.splice(parseInt(start),parseInt(end));

        var sendData:BlogPreviewInterface[] = [];
        for(var i = 0; i < blogs.length; i ++){
            const blog = blogs[i];
            
            sendData.push({
                date:blog.publishDate,
                id:blog.id,
                title:blog.title,
                text:"",
                author:blog.author
            });
        }

        res.send(sendData);
    });

    app.get("/blog/random",async(req,res)=>{
        const blogs = await GetAllBlogs();
        if(blogs === null){return res.status(500).send("No blogs found");}

        var randomIndex = Math.floor(Math.random()*blogs.length);

        res.status(200).json(blogs[randomIndex].id);
    });

    app.get("/blog/preview/:id",async(req,res)=>{
        const blog = await GetBlog(req.params.id);
        if(blog === null){return res.status(400).send("No blog found");}
        
        const author = await GetUser(blog.author);
        if(author === null){return res.status(500).send("No author found for the blog");}

        var text = "";
        if(blog.content.length !== 0){
            text = blog.content[0].text;
        }

        text = text.substring(0, 40 * 7);
        if(text[text.length - 1] === "," || text[text.length - 1] === " "){
            text = text.slice(0, -1);
        }
        text += "...";
        const data:BlogPreviewInterface = {
            id:blog.id,
            date:blog.publishDate,
            text:text,
            title:blog.title,
            author:author.name
        } 
        res.status(200).json(data);
    });

    app.get("/blog/:id",async(req,res)=>{
        const blog = await GetBlog(req.params.id);
        res.status(200).json(blog);
    });

    app.post("/blog/create",AuthToken,async(req,res)=>{
        const user = await GetUserMicrosoftID(req.id);
        if(user === null){return res.status(400).send("No user found");}

        const blog:BlogInterface = {
            author:user.id,
            content:[{
                title:"Titel på stycke",
                text:"Text som ska berätta en sak om bilderna runt texten eller helt utan bilder. Klicka på mig och börja ändra hur jag ser ut. Bildernas storlek kan du ändra genom att dra på dem och se hur texten anpassar sig runt bilderna. Skapa en sektion ovanför mig genom att klicka på den gråa knappen. Om du har fler än ett stycke kan du ta bort mig genom att klicka på den röda knappen. Flytta mig upp eller ner med pilarna bredvid den gråa och röda knappen. :D",
                imgLeft:{
                    alt:"Alternativ text",
                    link:"https://unsplash.it/500/500",
                    sizeX:"30%",
                    sizeY:"5.8"
                },
                imgRight:{
                    alt:"Alternativ text",
                    link:"https://unsplash.it/500/500",
                    sizeX:"40%",
                    sizeY:"2.3"
                }
            },{
                title:"Titel på stycke",
                text:"Text som ska berätta en sak om bilderna runt texten eller helt utan bilder. Klicka på mig och börja ändra hur jag ser ut. Bildernas storlek kan du ändra genom att dra på dem och se hur texten anpassar sig runt bilderna. Skapa en sektion ovanför mig genom att klicka på den gråa knappen. Om du har fler än ett stycke kan du ta bort mig genom att klicka på den röda knappen. Flytta mig upp eller ner med pilarna bredvid den gråa och röda knappen. :D",
                imgLeft:{
                    alt:"Alternativ text",
                    link:"https://unsplash.it/500/500",
                    sizeX:"30%",
                    sizeY:"5.8"
                },
                imgRight:{
                    alt:"Alternativ text",
                    link:"https://unsplash.it/500/500",
                    sizeX:"40%",
                    sizeY:"2.3"
                }
            }],
            id:"",
            language:{
                code:"En",
                name:"English"
            },
            publishDate:Date.now(),
            lastUpdated:Date.now(),
            title:"Temporär titel på din nya blog"
        }

        const newBlog = await CreateBlog(blog);
        await UserAddBlog(newBlog.author,newBlog.id);
        res.status(201).json(newBlog);
    });
}