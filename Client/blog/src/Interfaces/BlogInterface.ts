import { Language } from "./StaticInterface";

export interface BlogInterface {
    title:string,
    author:string,
    publishDate:number,
    lastUpdated:number,
    language:Language,
    content:BlogContentInterface[],
    id:string
}

export interface BlogPreviewInterface {
    title:string,
    id:string,
    text:string,
    date:number,
    author:string
}

export interface BlogContentInterface {
    title:string,
    imgLeft:BlogImageInterface|null,
    imgRight:BlogImageInterface|null,
    text:string
}

export interface BlogImageInterface {
    link:string,
    sizeX:string,
    sizeY:string,
    alt:string
}