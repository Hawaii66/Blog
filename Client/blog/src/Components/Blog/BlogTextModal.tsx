import React, { useContext, useRef, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BlogContext } from './Blog';
import BlogImageModal from './BlogImageModal';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>,
    index:number
}

function BlogTextModal({setShow, index}:Props) {
    const {blogPost,setBlogPost} = useContext(BlogContext);

    const textRef = useRef<HTMLTextAreaElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const fileInputRefLeft = useRef<HTMLInputElement>(null);
    const fileInputRefRight = useRef<HTMLInputElement>(null);
    const leftImgRef = useRef<HTMLInputElement>(null);
    const rightImgRef = useRef<HTMLInputElement>(null);

    const updateShowSettings = (b:boolean) => {
        setShow(b);
    }

    const save = async () => {
        if(setBlogPost === null || textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null || titleRef.current === null || titleRef.current.value === null){return;}
        if(leftImgRef === null || leftImgRef.current === null || leftImgRef.current.value === null){return;}
        if(rightImgRef === null || rightImgRef.current === null || rightImgRef.current.value === null){return;}

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
        }else{
        info.content[index].imgRight = null;
        }
        setBlogPost(info);
        setShow(false);
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
    },[]);

    const postImage = async(dir:"left"|"right") => {
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
    }
    
    return (
        <Modal show={true} onHide={() => updateShowSettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Text Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control ref={titleRef} type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control ref={textRef} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Vänster bild</Form.Label>
                            <Form.Check
                                ref={leftImgRef} 
                                type={"checkbox"}
                            />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control ref={fileInputRefLeft} accept='image/jpeg,image/png' type="file" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Höger bild</Form.Label>
                            <Form.Check 
                                ref={rightImgRef}
                                type={"checkbox"}
                            />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control ref={fileInputRefRight} accept='image/jpeg,image/png' type="file" />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => updateShowSettings(false)}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Spara ändringar
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default BlogTextModal
