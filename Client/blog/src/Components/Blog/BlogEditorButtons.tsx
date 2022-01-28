import React, { useContext } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { BlogContext } from './Blog';

export interface Props{
    index:number,
    lastToggle:boolean,
    saveButtonPressed:()=>void
}

function BlogEditorButtons({index,lastToggle,saveButtonPressed}:Props) {
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
            title:"Titel",
            text:"Temporär text som inte ska synas",
            imgLeft:{
                alt:"Alternativ text",
                link:"https://unsplash.it/500/500",
                sizeX:"30%",
                sizeY:"5"
            },
            imgRight:{
                alt:"Alternativ text",
                link:"https://unsplash.it/500/500",
                sizeX:"40%",
                sizeY:"2"
            }
        });
        setBlogPost(post);
    }

    const remove = () => {
        var post = blogPost
        if(post === null || blogPost === null){return;}
        if(setBlogPost === null){return;}

        post.content = [...blogPost.content];
        post.content.splice(index, 1);
        setBlogPost(post)
    }

    return (
        <div className="center">
            <ButtonGroup className={`${lastToggle ? "Middle" : "End"}`}>
                {lastToggle && <Button onClick={save} variant="primary">Spara</Button>}
                {!lastToggle && <Button className="Trash" onClick={remove} variant="danger"></Button>}
                <Button className="Create" onClick={createAbove} variant="secondary"></Button>
            </ButtonGroup> 
        </div>
    )
}

export default BlogEditorButtons
