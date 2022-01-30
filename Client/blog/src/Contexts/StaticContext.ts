import { createContext } from "react";

interface StaticContext {
    apiEndPoint:string,
    website:string
}

export const StaticContext = createContext<StaticContext>(
    {
        apiEndPoint:"https://hawaii-dev-blog.herokuapp.com",
        website:"https://www.blog.hawaiidev.net"
    }
);