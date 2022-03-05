import React, { useContext, useRef, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BlogImageInterface, BlogInterface } from '../../Interfaces/BlogInterface';
import { BlogContext } from './Blog';
import ImageSelect from './ImageSelect';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>,
    index:number
}

function BlogTextModal({setShow, index}:Props) {
    const [unSavedBlog, setUnSaved] = useState<BlogInterface|null>(null);
 
    const {blogPost,setBlogPost} = useContext(BlogContext);

    const textRef = useRef<HTMLTextAreaElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const leftImgRef = useRef<HTMLInputElement>(null);
    const rightImgRef = useRef<HTMLInputElement>(null);

    const updateShowSettings = (b:boolean) => {
        setShow(b);
    }

    /*const save = async () => {
        if(setBlogPost === null || textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null || titleRef.current === null || titleRef.current.value === null){return;}
        if(leftImgRef === null || leftImgRef.current === null || leftImgRef.current.value === null){return;}
        if(rightImgRef === null || rightImgRef.current === null || rightImgRef.current.value === null){return;}
        if(leftAltRef === null || leftAltRef.current === null || leftAltRef.current.value === null){return;}
        if(rightAltRef === null || rightAltRef.current === null || rightAltRef.current.value === null){return;}

        var info:any = blogPost;

        info.content[index].text = textRef.current.value;
        info.content[index].title = titleRef.current.value;
        if(leftImgRef.current.checked){
            if(info.content[index].imgLeft === null){
                info.content[index].imgLeft = {
                    link:"",
                    text:"",
                    sizeX:"100px",
                    sizeY:"100px"
                }
            }
            if(fileInputRefLeft !== null && fileInputRefLeft.current !== null && fileInputRefLeft.current.value !== "")
            {
                info.content[index].imgLeft.link = await postImage("left");
            }
            info.content[index].imgLeft.text = leftAltRef.current.value;
        }else{
            info.content[index].imgLeft = null;
        }
        if(rightImgRef.current.checked){
            if(info.content[index].imgRight === null){
                info.content[index].imgRight = {
                    link:"",
                    text:"",
                    sizeX:"100px",
                    sizeY:"100px"
                }
            }
            if(fileInputRefRight !== null && fileInputRefRight.current !== null && fileInputRefRight.current.value !== "")
            {
                info.content[index].imgRight.link = await postImage("right");
            }
            info.content[index].imgRight.text = rightAltRef.current.value;
        }else{
            info.content[index].imgRight = null;
        }

        if(info === null){return;}
        setShow(false);
        setBlogPost(info);
        //setBlogPost(await CloudSave(info,apiEndPoint,accessToken,refreshToken));;
    }*/

    const CloudSave = async () =>{
        if(textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null ||titleRef.current === null ||titleRef.current.value === null){return;}

        console.log("Cloud save");

        if(blogPost === null){return;}
        if(unSavedBlog === null){return;}

        var info:BlogInterface = {
            title:blogPost.title,
            author:blogPost.author,
            content:[...blogPost.content],
            id:blogPost.id,
            language:blogPost.language,
            publishDate:blogPost.publishDate,
            lastUpdated:blogPost.lastUpdated
        }

        info.content[index] = unSavedBlog.content[index];
        info.content[index].text = textRef.current.value;
        info.content[index].title = titleRef.current.value;

        console.log(textRef,titleRef);
        console.log("Finish", info);
        setShow(false);
        setBlogPost(info);
    }

    useEffect(()=>{
        if(textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null || titleRef.current === null || titleRef.current.value === null){return;}
        if(leftImgRef === null || leftImgRef.current === null || leftImgRef.current.value === null){return;}
        if(rightImgRef === null || rightImgRef.current === null || rightImgRef.current.value === null){return;}

        var info:any = blogPost;
        
        textRef.current.value = info.content[index].text;
        titleRef.current.value = info.content[index].title;
        leftImgRef.current.checked = info.content[index].imgLeft !== null;
        rightImgRef.current.checked = info.content[index].imgRight !== null;
    },[blogPost,index]);

    /*const postImage = async(dir:"left"|"right") => {
        var fileInputRef = fileInputRefLeft;
        if(dir === "right"){
            fileInputRef = fileInputRefRight;
        }

        if(fileInputRef === null || fileInputRef.current === null || fileInputRef.current.files === null){return;}
        
        const form = new FormData();
        form.append("image", fileInputRef.current.files[0]);

        var result:any = await fetch("http://localhost:5000/images",{
            method:"POST",
            body:form,
        });

        result = await result.json();
        return "http://localhost:5000"+result.filePath;
    }*/

    const ChangeImage = (img:BlogImageInterface|null,dir:"Left"|"Right") => {
        if(blogPost === null){return;}

        var info:BlogInterface = {
            author:blogPost.author,
            content:[...blogPost.content],
            id:blogPost.id,
            language:blogPost.language,
            publishDate:blogPost.publishDate,
            lastUpdated:blogPost.lastUpdated,
            title:blogPost.title
        }

        if(dir === "Left"){
            info.content[index].imgLeft = img;
        }else{
            info.content[index].imgRight = img;
        }

        setUnSaved(info);
        //setBlogPost(info);
    }

    const cancelSettings = () =>{
        setUnSaved(null);
        updateShowSettings(false)
    }

    useEffect(()=>{
        setUnSaved(blogPost);
    },[blogPost])
    
    return (
        <Modal dialogClassName="ModalSize" show={true} onHide={cancelSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>Text Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control defaultValue={blogPost === null ? "" : blogPost.content[index].title} ref={titleRef} type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control defaultValue={blogPost === null ? "" : blogPost.content[index].text} ref={textRef} as="textarea" rows={12} />
                        </Form.Group>
                        <ImageSelect dir="Left" img={(unSavedBlog === null) ? null : unSavedBlog.content[index].imgLeft} setImg={(i)=>ChangeImage(i,"Left")}/>
                        <ImageSelect dir="Right" img={(unSavedBlog === null) ? null : unSavedBlog.content[index].imgRight} setImg={(i)=>ChangeImage(i,"Right")}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelSettings}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={CloudSave}>
                        Spara ändringar
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default BlogTextModal
