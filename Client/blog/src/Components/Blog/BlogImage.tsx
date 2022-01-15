import React, { useCallback, useRef, useState } from 'react'
import { EditorSettings } from './Blog';
import { BlogImageInterface } from '../../Interfaces/BlogInterface'
import BlogImageModal from './BlogImageModal';

export interface Props{
    image:BlogImageInterface|null,
    dir:"left"|"right",
    editorSettings:EditorSettings,
    setEditorSettings:React.Dispatch<React.SetStateAction<EditorSettings>>
}

function BlogImage({image, dir, editorSettings, setEditorSettings}:Props) {
    const [initPosX, setInitPosX] = useState<number>(0);
    const [initPosY, setInitPosY] = useState<number>(0);
    const [initSizeX, setInitSizeX] = useState<undefined|number>(0);
    const [initSizeY, setInitSizeY] = useState<undefined|number>(0);
    const [showSettings, setShowSettings] = useState(false);

    const [imageX, setImageX] = useState<string>((image === null) ? "0" : image?.sizeX);
    const [imageY, setImageY] = useState<string>((image === null) ? "0" : image?.sizeY);

    const resizeRef = useRef<HTMLImageElement>(null);
    
    const initial = (e:any) => {
        if(!editorSettings.isEditor){return;}

        let resizable = resizeRef.current;
        if(resizable === null || e === undefined){return;} 
        
        if(dir === "left"){
            setInitSizeX(resizable.offsetWidth);
            setInitSizeY(resizable.offsetHeight);
            setInitPosX(e.clientX);
            setInitPosY(e.clientY);
        }else{
            setInitSizeX(resizable.offsetWidth);
            setInitSizeY(resizable.offsetHeight);
            setInitPosX(e.clientX);
            setInitPosY(e.clientY);
        }
    }

    const resize = (e:any) => {
        if(!editorSettings.isEditor){return;}

        let resizable = resizeRef.current;
        if(resizable === null || initSizeX === undefined || initSizeY === undefined){return;}

        if(dir === "left"){
            setImageX(`${initSizeX + e.clientX - initPosX}px`);
        }
        else{
            setImageX(`${initSizeX + (e.clientX - initPosX)*-1}px`);
        }

        setImageY(`${initSizeY + e.clientY - initPosY}px`);
    }

    const updateShowSettings = (b:boolean) => {
        setShowSettings(b);
    }

    if(image == null){
        return <></>
    }

    return(
        <div className="imgParent">
            <div
                draggable="true"
                onDragStart={initial}
                onDrag={resize}
                onDragEnd={resize}
                onClick={() => updateShowSettings(!showSettings)}
                style={{cursor:"none"}}
            >
                <img
                    className="Image"
                    ref={resizeRef}
                    key={image.link} 
                    src={image.link} 
                    alt={image.alt}
                    style={{
                        objectFit:"cover",
                        objectPosition:"50% 50%",
                        margin:"1rem",
                        float:dir,
                        borderRadius:"25px",
                        width:imageX,
                        height:imageY,
                    }}
                    draggable="false"
                />
            </div>

            {showSettings && <BlogImageModal setShow={setShowSettings}/>}
        </div>
    )
}

export default BlogImage;