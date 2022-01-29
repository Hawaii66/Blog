import React, { useState, useContext } from 'react'
import { BlogContentInterface } from '../../Interfaces/BlogInterface'
import { useWindowSize } from '../../Utils/Hooks'
import { BlogContext, EditorSettings } from './Blog'
import BlogEditorButtons from './BlogEditorButtons'
import BlogImage from './BlogImage'
import BlogTextModal from './BlogTextModal'

export interface Props{
    content:BlogContentInterface,
    index:number,
    editorSettings:EditorSettings,
    screenWidth:number,
    setEditorSettings:React.Dispatch<React.SetStateAction<EditorSettings>>
}

function BlogContent({content, screenWidth, index, editorSettings, setEditorSettings}:Props) {
    //ToTree(content.text);
    //FIrst correct huffman: "TTTWWhH1111111111111111111111111111111111111111111111111111"
    const [showPModal, setShowP] = useState(false);

    if(screenWidth < 992){
        return(
            <div style={{marginTop:"2rem"}}>
                <div className="Def6090" key={index} style={{padding:"2rem",border:"1px rgba(1,1,1,0.2) solid",margin:"auto",overflow:"auto"}}>
                    <div style={{margin:"0.8em",display:"flex",alignItems:"center"}}>
                        <h2 style={{display:"inline-block",margin:"auto",marginTop:"2rem",textAlign:"center",borderBottom:"1px solid black"}}>
                            {content.title}
                        </h2>
                        
                    </div>
                    <BlogImage min index={index} editorSettings={editorSettings} image={content.imgLeft} dir="left" />
                    <p style={{minHeight:"120px"}}>{content.text}</p>
                    <BlogImage min index={index} editorSettings={editorSettings} image={content.imgRight} dir="right" />
                </div>
            </div>
        )
    }

    return (
        <div style={{marginTop:"2rem"}}>
            <div key={index} style={{padding:"2rem",border:"1px rgba(1,1,1,0.2) solid",width:"60%",margin:"auto",overflow:"auto"}}>
                {editorSettings.isEditor && <BlogEditorButtons onlySave={false} saveButtonPressed={()=>console.log("Error")} lastToggle={false} index={index}/>}
                <div style={{margin:"0.8em",display:"flex",alignItems:"center"}}>
                    <h2 onClick={()=>setShowP(true)} style={{display:"inline-block",margin:"auto",marginTop:"2rem",textAlign:"center",borderBottom:"1px solid black"}}>
                        {content.title}
                    </h2>
                    
                </div>
                <BlogImage min={false} index={index} editorSettings={editorSettings} image={content.imgLeft} dir="left" />
                <BlogImage min={false} index={index} editorSettings={editorSettings} image={content.imgRight} dir="right" />
                <p onClick={()=>setShowP(true)} style={{minHeight:"120px"}}>{content.text}</p>
                {showPModal && editorSettings.isEditor && <BlogTextModal index={index} setShow={setShowP} />}
            </div>
        </div>
    )
}

//TODO Make p contentEditable

export default BlogContent
