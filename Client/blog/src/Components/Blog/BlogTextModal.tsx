import React, { useContext, useRef, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BlogContext } from './Blog';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>,
    index:number
}

function BlogTextModal({setShow, index}:Props) {
    const {blogPost,setBlogPost} = useContext(BlogContext);

    const textRef = useRef<HTMLTextAreaElement|null>(null);
    const titleRef = useRef<HTMLInputElement|null>(null);

    const updateShowSettings = (b:boolean) => {
        setShow(b);
    }

    const save = () => {
        if(setBlogPost === null || textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null || titleRef.current === null || titleRef.current.value === null){return;}

        var info:any = blogPost;

        info.content[index].text = textRef.current.value;
        info.content[index].title = titleRef.current.value;
        console.log(info);
        setBlogPost(info);
        setShow(false);
    }

    useEffect(()=>{
        if(textRef === null || textRef.current === null || textRef.current.value === null){return;}
        if(titleRef === null || titleRef.current === null || titleRef.current.value === null){return;}
        
        var info:any = blogPost;
        
        textRef.current.value = info.content[index].text;
        titleRef.current.value = info.content[index].title;
    },[]);
    
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
                                type={"checkbox"}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Höger bild</Form.Label>
                            <Form.Check 
                                type={"checkbox"}
                            />
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
