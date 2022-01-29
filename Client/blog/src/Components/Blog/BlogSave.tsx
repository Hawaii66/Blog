import React, {useRef,useContext, useState} from 'react'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext';
import { BlogInterface } from '../../Interfaces/BlogInterface';
import { Language, Languages } from '../../Interfaces/StaticInterface';
import { BlogContext, CloudSave } from './Blog';

export interface Props{
    setShow:React.Dispatch<React.SetStateAction<boolean>>
}

function BlogSave({setShow}:Props) {
    const [lang,setLang] = useState<Language>({
        code:"",
        name:""
    });
    
    const {blogPost, setBlogPost} = useContext(BlogContext);
    const {apiEndPoint} = useContext(StaticContext);
    const {accessToken,refreshToken} = useContext(UserContext);

    const cancelSave = () => {
        setShow(false);
    }

    const save = async () => {
        if(nameRef === null || nameRef.current === null){return;}
        if(blogPost === null){return null;}

        var name = nameRef.current.value;

        var info:BlogInterface = {
            author:blogPost.author,
            content:[...blogPost.content],
            language:lang,
            publishDate:Date.now(),
            title:name,
            id:blogPost.id
        }

        var newBlog = await CloudSave(info, apiEndPoint, accessToken, refreshToken);
        setBlogPost(newBlog);
        cancelSave();
    }

    const changeLang = (e:React.ChangeEvent<HTMLSelectElement>) => {
        for(var i = 0; i < Languages.length; i ++){
            if(Languages[i].code === e.target.value){
                setLang(Languages[i]);
                return;
            }
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
                            <Form.Control defaultValue={blogPost === null ? "" : blogPost.title} ref={nameRef} type="text"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Språk</Form.Label>
                            <Form.Select onChange={(e)=>changeLang(e)} aria-label="Default select example">
                                {Languages.map((lang, i)=>{
                                    return(
                                        <option key={i} value={lang.code}>{lang.name}</option>
                                    )
                                })}
                            </Form.Select>
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
