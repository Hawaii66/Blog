export interface BlogInterface {
    title:string,
    author:string,
    publishDate:number,
    language:string,
    content:BlogContentInterface[]
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