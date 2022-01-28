import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { BlogContext, CloudSave, EditorSettings } from './Blog';
import { BlogImageInterface, BlogInterface } from '../../Interfaces/BlogInterface'
import BlogImageModal from './BlogImageModal';
import BlogContent from './BlogContent';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext';

export interface Props{
    image:BlogImageInterface|null,
    dir:"left"|"right",
    editorSettings:EditorSettings,
    index:number
}

function BlogImage({image, dir, editorSettings, index}:Props) {
    const [initPosX, setInitPosX] = useState<number>(0);
    const [initPosY, setInitPosY] = useState<number>(0);
    const [initSizeX, setInitSizeX] = useState<undefined|number>(0);
    const [initSizeY, setInitSizeY] = useState<undefined|number>(0);
    const [showSettings, setShowSettings] = useState(false);

    const [imageX, setImageX] = useState<string>((image === null) ? "0" : image?.sizeX);
    const [imageY, setImageY] = useState<string>((image === null) ? "0" : image?.sizeY);

    const resizeRef = useRef<HTMLImageElement>(null);

    const {blogPost,setBlogPost} = useContext(BlogContext);
    const {apiEndPoint} = useContext(StaticContext);
    const {accessToken, refreshToken} = useContext(UserContext);

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
        
        if(e.clientX === 0 || e.clientY === 0){
            return;
        }

        if(dir === "left"){
            const pixelSize = initSizeX + e.clientX - initPosX;
            const percent = CalcPercentX(pixelSize);

            setImageX(`${percent}%`);
        }
        else{
            const pixelSize = initSizeX + (e.clientX - initPosX)*-1;
            const percent = CalcPercentX(pixelSize);

            setImageX(`${percent}%`);
        }

        const pixelSize = initSizeY + e.clientY - initPosY;
        const percent = CalcPercentY(pixelSize);

        setImageY(`${pixelSize}px`);
    }

    const CalcPercentX = (pixelSize:number)=>{
        return pixelSize / window.innerHeight * 100;
    }
    const CalcPercentY = (pixelSize:number)=>{
        return pixelSize / window.screen.height * 100;
    }

    const updateShowSettings = (b:boolean) => {
        setShowSettings(b);
    }

    useEffect(()=>{
        console.log(imageX);
    },[imageX])

    const save = async () => {
        if(blogPost === null){return;}
        console.log(imageX);
        var newBlog:BlogInterface = {
            author:blogPost.author,
            content:[...blogPost.content],
            id:blogPost.id,
            language:blogPost.language,
            publishDate:blogPost.publishDate,
            title:blogPost.title
        }

        if(dir === "left"){
            var img = blogPost.content[index].imgLeft;
            if(img === null){return;}
            img.sizeX = imageX;
            img.sizeY = imageY;
            
            newBlog.content[index].imgLeft = img;
        }else{
            var img = blogPost.content[index].imgRight;
            if(img === null){return;}
            img.sizeX = imageX;
            img.sizeY = imageY;
            
            newBlog.content[index].imgRight = img;
        }

        setBlogPost(await CloudSave(newBlog, apiEndPoint, accessToken, refreshToken));
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
                onDragEnd={(e)=>{
                    resize(e);
                    save();
                }}
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

            {/*showSettings && <BlogImageModal dir={dir} index={index} setShow={setShowSettings}/>*/}
        </div>
    )
}

export default BlogImage;