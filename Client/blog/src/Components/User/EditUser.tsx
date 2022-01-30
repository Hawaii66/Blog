import React, { useContext, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext';

export interface Props{
    setEdit:React.Dispatch<React.SetStateAction<boolean>>
}

function EditUser({setEdit}:Props) {
    const nameRef = useRef<HTMLInputElement|null>(null);

    const {user, accessToken, refreshToken, setUser} = useContext(UserContext);
    const {apiEndPoint} = useContext(StaticContext);

    const cancelSettings = () => {
        setEdit(false);
    }

    const saveEdits = async() => {
        if(nameRef === null || nameRef.current === null || nameRef.current.value === null){return;}

        const data = {
            name:nameRef.current.value,
        }

        var result = await fetch(`${apiEndPoint}/users/edit`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            }
        });

        if(result.status !== 200){
            var token = await refreshToken();
            result = await fetch(`${apiEndPoint}/users/edit`,{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
        }

        var res = await result.json();

        setUser(res);
        cancelSettings();
    }

    if(user === null){
        return(
            <div>Error: Kan inte hitta en användare att redigera</div>
        );
    }

    return (
        <Modal dialogClassName="ModalSize" show={true} onHide={cancelSettings}>
            <Modal.Header closeButton>
                <Modal.Title>Text Inställningar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Namn</Form.Label>
                        <Form.Control defaultValue={user.name} ref={nameRef} type="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelSettings}>
                    Stäng
                </Button>
                <Button variant="primary" onClick={saveEdits}>
                    Spara ändringar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUser;
