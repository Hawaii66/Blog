import { createContext } from "react";

interface StaticContextInterface {
    apiEndPoint:string,
    website:string
}

export const StaticContext = createContext<StaticContextInterface>(
    {
        apiEndPoint:"http://localhost:5000",
        website:"http://localhost:3000"//"https://www.blog.hawaiidev.net"
    }
);