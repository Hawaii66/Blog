import React, {useRef,useContext} from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BlogInterface } from '../../Interfaces/BlogInterface';
import { BlogContext } from './Blog';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

function BlogSave({setShow}:Props) {
    const {blogPost, setBlogPost} = useContext(BlogContext);

    const cancelSave = () => {
        setShow(false);
    }

    const save = () => {
        if(nameRef === null || nameRef.current === null){return;}
        if(blogPost === null){return null;}

        var name = nameRef.current.value;

        var info:BlogInterface = {
            author:blogPost.author,
            content:[...blogPost.content],
            language:blogPost?.language,
            publishDate:Date.now(),
            title:name
        }
    }

    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <Modal show={true} onHide={() => cancelSave()}>
                <Modal.Header closeButton>
                    <Modal.Title>Text Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Blog namn</Form.Label>
                            <Form.Control ref={nameRef} type="text"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => cancelSave()}>
                        Stäng
                    </Button>
                    <Button variant="primary" onClick={() => save()}>
                        Spara ändringar
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default BlogSave
