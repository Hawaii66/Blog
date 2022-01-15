import React, { useRef, useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BlogContext } from './Blog';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>
    index:number,
    dir:"left"|"right"
}

function BlogImageModal({index,dir,setShow}:Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateShowSettings = (b:boolean) => {
        setShow(b);
    }

    const {blogPost,setBlogPost} = useContext(BlogContext);
    
    const updateImage = () => {
        if(fileInputRef === null || fileInputRef.current === null || fileInputRef.current.files === null){return;}

        const form = new FormData();
        form.append("image", fileInputRef.current.files[0]);

        fetch("http://localhost:5000/images",{
            method:"POST",
            body:form,
        }).then(res => res.json().then(res => {
            console.log(res);
            if(blogPost === null){return;}
            var info:any = blogPost

            if(dir === "left"){
                info.content[index].imgLeft.link = "http://localhost:5000"+res.filePath;
            }else{
                info.content[index].imgRight.link = "http://localhost:5000"+res.filePath;
            }
            if(setBlogPost === null){return;}
            setBlogPost(info);
        }))
    }

    return (
            <Modal show={true} onHide={() => updateShowSettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Bild Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Välj Bild</Form.Label>
                        <Form.Control ref={fileInputRef} accept='image/jpeg,image/png' type="file" />
                    </Form.Group>
                    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => updateShowSettings(false)}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={() => updateImage()}>
                        Spara ändringar
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default BlogImageModal
