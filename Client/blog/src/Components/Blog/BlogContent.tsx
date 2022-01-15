import React from 'react'
import { BlogContentInterface } from '../../Interfaces/BlogInterface'
import { FromTree, ToTree } from '../../Utils/HuffmanEncoding'
import BlogImage from './BlogImage'

export interface Props{
    content:BlogContentInterface,
    index:number
}

function BlogContent({content, index}:Props) {
    //ToTree(content.text);
    //FIrst correct huffman: "TTTWWhH1111111111111111111111111111111111111111111111111111"

    return (
        <div key={index} style={{width:"1500px",margin:"auto",overflow:"auto"}}>
            
            <h2 style={{textAlign:"center",margin:"0.8em",borderBottom:"1px solid black"}}>{content.title}</h2>
            <BlogImage image={content.imgLeft} dir="left" />
            <BlogImage image={content.imgRight} dir="right" />
            <p style={{margin:"2rem"}}>{content.text}</p>
        </div>
    )
}

export default BlogContent
