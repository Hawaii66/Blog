import {Express, Request, Response} from "express";
import { BlogInterface } from "../Interfaces/BlogInterface";
import { CreateBlog, GetBlog } from "../Database/BlogDB";
import { AuthToken } from "./AuthRoutes";
import { GetUserMicrosoftID, UserAddBlog } from "../Database/AccountDB";
import { blogs } from "../Database/DatabaseAPI";

export const BlogRoutes = (app:Express) => {
    app.post("/blog/save",AuthToken,async(req,res)=>{
        const dataBlog = req.body.blog;
        
        const blog:BlogInterface = {
            author:dataBlog.author,
            content:dataBlog.content,
            id:req.body.id,
            language:dataBlog.language,
            publishDate:dataBlog.publishDate,
            title:dataBlog.title
        }

        const user = await GetUserMicrosoftID(req.body.id)
        if(user === null){return;}
        await UserAddBlog(user.id, blog.id);
        
        const newBlog = await blogs.findOneAndUpdate({id:blog.id},{$set:blog});
        res.status(200).json(newBlog);
    });

    app.get("/blog/:id",async(req,res)=>{
        const blog = await GetBlog(req.params.id);
        res.status(200).json(blog);
    });

    app.post("/blog/create",AuthToken,async(req,res)=>{
        console.log("New blog Post");

        const user = await GetUserMicrosoftID(req.id);
        if(user === null){return res.status(400).send("No user found");}

        const blog:BlogInterface = {
            author:user.name,
            content:[{
                imgLeft:null,
                imgRight:null,
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quasi corrupti odit deleniti quas impedit repellendus ut amet quae nam praesentium ratione voluptatibus veniam suscipit sequi, beatae sint? Ratione soluta totam, nisi unde atque, sed perspiciatis et mollitia ipsam dolor rerum autem ut placeat dolorem numquam ea vero maxime reprehenderit ad quae eaque molestiae quisquam facilis. Iusto debitis nisi at non assumenda facilis minima rerum ea, voluptates nam eius doloremque? Rerum possimus optio dolor obcaecati repudiandae. Aliquid, sed. Vitae repellat eius, placeat ratione porro quia officiis eos exercitationem qui, distinctio, nulla recusandae! Unde minus nihil exercitationem reprehenderit mollitia eum quo. Ullam tenetur at similique architecto minima expedita dolore error, qui delectus voluptas voluptates nihil voluptatum atque provident praesentium quos veritatis, culpa porro tempora pariatur! Odit, fugit dolore pariatur molestiae nulla perspiciatis dignissimos reprehenderit voluptates eveniet id nam tempore ad officiis modi, veniam a minus consequuntur fugiat iste quasi voluptatum, sed ipsa repellendus minima! Quia, tempore vero iste ipsam nostrum quae incidunt nam saepe modi eaque ullam labore pariatur aliquam sunt consequatur consectetur numquam distinctio similique tempora maxime repellat. Sint doloremque, voluptate, quas inventore doloribus molestias aliquid ex autem ipsum consectetur ducimus. Magni asperiores deserunt delectus itaque ratione nulla velit qui.",
                title:"Chapter title here"
            }],
            id:"",
            language:"EN",
            publishDate:Date.now(),
            title:"Title Here"
        }

        const newBlog = await CreateBlog(blog);
        console.log(newBlog);
        res.status(201).json(newBlog);
    });
}