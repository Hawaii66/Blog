import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { BlogContentInterface } from '../../Interfaces/BlogInterface'
import { EditorSettings } from './Blog'
import BlogImage from './BlogImage'
import BlogTextModal from './BlogTextModal'

export interface Props{
    content:BlogContentInterface,
    index:number,
    editorSettings:EditorSettings,
    setEditorSettings:React.Dispatch<React.SetStateAction<EditorSettings>>
}

function BlogContent({content, index, editorSettings, setEditorSettings}:Props) {
    //ToTree(content.text);
    //FIrst correct huffman: "TTTWWhH1111111111111111111111111111111111111111111111111111"
    const [showPModal, setShowP] = useState(false);

    const save = () => {
        console.log("Save");
    }

    const createAbove = () => {

    }

    const remove = () => {

    }

    return (
        <div>
            <div key={index} style={{width:"1500px",margin:"auto",overflow:"auto"}}>
                
                <h2 onClick={()=>setShowP(true)} style={{textAlign:"center",margin:"0.8em",borderBottom:"1px solid black"}}>{content.title}</h2>
                <BlogImage index={index} editorSettings={editorSettings} image={content.imgLeft} dir="left" />
                <BlogImage index={index} editorSettings={editorSettings} image={content.imgRight} dir="right" />
                <p onClick={()=>setShowP(true)} style={{minHeight:"120px", margin:"2rem"}}>{content.text}</p>
                {showPModal && <BlogTextModal index={index} setShow={setShowP} />}

            </div>
            <ButtonGroup aria-label="Knappar">
                <Button onClick={save} variant="primary">Spara</Button>
                <Button onClick={remove} variant="danger">Ta bort</Button>
                <Button onClick={createAbove} variant="secondary">Skapa sektion över</Button>
            </ButtonGroup>
        </div>
    )
}

//TODO Make p contentEditable

export default BlogContent
