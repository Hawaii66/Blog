import React from 'react'
import { BlogImageInterface } from '../../Interfaces/BlogInterface'

export interface Props{
    image:BlogImageInterface|null,
    dir:"left"|"right"
}

function BlogImage({image, dir}:Props) {
    if(image == null){
        return <></>
    }

    return(
        <img
            key={image.link} 
            src={image.link} 
            alt={image.alt}
            style={{
                objectFit:"cover",
                objectPosition:"50% 50%",
                margin:"1rem",
                borderRadius:"25px",
                float:dir,
                width:image.sizeX,
                height:image.sizeY,
            }}
         />
    )
}

export default BlogImage
