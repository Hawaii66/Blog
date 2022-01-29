import React, { useContext } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { BlogContext } from './Blog';

export interface Props{
    index:number,
    lastToggle:boolean,
    onlySave:boolean,
    saveButtonPressed:()=>void
}

function BlogEditorButtons({index,onlySave,lastToggle,saveButtonPressed}:Props) {
    const {blogPost, setBlogPost} = useContext(BlogContext);
    
    const save = () => {
        console.log("Save");
        saveButtonPressed();
    }

    const createAbove = () => {
        var post = blogPost
        if(post === null || blogPost === null){return;}
        if(setBlogPost === null){return;}

        post.content = [...blogPost.content];
        post.content.splice(index, 0, {
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
        });
        setBlogPost(post);
    }

    const move = (dir:"Up"|"Down") => {
        var post = blogPost
        if(post === null || blogPost === null){return;}
        if(setBlogPost === null){return;}

        post.content = [...blogPost.content];

        var currentPost = post.content[index];
        post.content.splice(index, 1);
        post.content.splice(index + (1 * (dir === "Up" ? -1 : 1)), 0, currentPost);

        setBlogPost(post);
    }

    const remove = () => {
        var post = blogPost
        if(post === null || blogPost === null){return;}
        if(setBlogPost === null){return;}
        if(post.content.length < 2){return;} // Must have atleast one post

        post.content = [...blogPost.content];
        post.content.splice(index, 1);
        setBlogPost(post)
    }

    return (
        <div className="center">
            <ButtonGroup className={`${lastToggle ? "Middle" : "End"}`}>
                {index !== 0 && !lastToggle && <Button onClick={()=>move("Up")} className="Icon Up" variant="primary"></Button>}
                {lastToggle && <Button onClick={save} variant="primary">Spara</Button>}
                {!lastToggle && <Button className="Icon Trash" onClick={remove} variant="danger"></Button>}
                {!onlySave && <Button className="Icon Create" onClick={createAbove} variant="secondary"></Button>}
                {blogPost?.content.length && index < blogPost.content.length - 1 && <Button className="Icon Down" onClick={()=>move("Down")} variant="primary"></Button>}
            </ButtonGroup> 
        </div>
    )
}

export default BlogEditorButtons
