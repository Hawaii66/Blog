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

    const resize = (e:any,pixel:boolean):{x:string,y:string} => {
        if(!editorSettings.isEditor){return {x:"0",y:"0"};}

        let resizable = resizeRef.current;
        if(resizable === null || initSizeX === undefined || initSizeY === undefined){return {x:"0",y:"0"};}
        
        if(e.clientX === 0 || e.clientY === 0){
            return {x:"0",y:"0"};
        }

        var pixelSizeX = 0;
        var percentX:number;
        if(dir === "left"){
            pixelSizeX = initSizeX + e.clientX - initPosX;
            percentX = CalcPercentX(pixelSizeX);
            
            if(pixel){
                setImageX(`${pixelSizeX}px`)
            }else{
                setImageX(`${percentX}%`);
            }
        }
        else{
            pixelSizeX = initSizeX + (e.clientX - initPosX)*-1;
            percentX = CalcPercentX(pixelSizeX);

            if(pixel){
                setImageX(`${pixelSizeX}px`);
            }else{
                setImageX(`${percentX}%`);
            }
        }

        const pixelSizeY = (initSizeY + e.clientY - initPosY);
        
        setImageY(`${pixelSizeY/pixelSizeX}`); //pixelSizeY

        return {x:`${percentX}%`,y:`${pixelSizeY/pixelSizeX}`}
    }

    const CalcPercentX = (pixelSize:number)=>{
        return pixelSize / window.innerWidth * 100;
    }

    const updateShowSettings = (b:boolean) => {
        setShowSettings(b);
    }

    useEffect(()=>{
    },[imageX])

    const save = async (imgX:string,imgY:string) => {
        if(blogPost === null){return;}

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
            img.sizeX = imgX;
            img.sizeY = imgY;
            
            newBlog.content[index].imgLeft = img;
        }else{
            var img = blogPost.content[index].imgRight;
            if(img === null){return;}
            img.sizeX = imgX;
            img.sizeY = imgY;
            
            newBlog.content[index].imgRight = img;
        }

        setBlogPost(await CloudSave(newBlog, apiEndPoint, accessToken, refreshToken));
    }

    if(image == null){
        return <></>
    }

    const GetHeight = (sizeX:string,sizeY:string):string=>{
        console.log("Get hieght", sizeX,sizeY);
        var val = 0;
        if(sizeX.charAt(sizeX.length - 1) === "%"){
            var x = sizeX.slice(0, sizeX.length - 2);
            
            val = window.innerWidth * parseFloat(x) / 100;
            val = val * parseFloat(sizeY);
        }
        else
        {
            val = parseFloat(sizeY)*parseFloat(sizeX.slice(0,sizeX.length - 2))
        }
        return `${val}px`
    }

    return(
        <div className="imgParent">
            <div
                draggable="true"
                onDragStart={initial}
                onDrag={(e)=>resize(e,true)}
                onDragEnd={(e)=>{
                    if(!editorSettings.isEditor){return;}
                    var cords:{x:string,y:string} = resize(e,false);
                    setTimeout(()=>{
                        save(cords.x,cords.y);
                    },500)
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
                        height:GetHeight(imageX,imageY)
                    }}
                    draggable="false"
                />
            </div>

            {/*showSettings && <BlogImageModal dir={dir} index={index} setShow={setShowSettings}/>*/}
        </div>
    )
}

export default BlogImage;