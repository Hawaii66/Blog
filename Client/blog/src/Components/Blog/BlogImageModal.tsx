import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

function BlogImageModal({setShow}:Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateShowSettings = (b:boolean) => {
        setShow(b);
    }

    const updateImage = () => {
        if(fileInputRef === null || fileInputRef.current === null || fileInputRef.current.files === null){return;}

        const form = new FormData();
        form.append("image", fileInputRef.current.files[0]);

        fetch("http://localhost:5000/images",{
            method:"POST",
            body:form,
        });
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
