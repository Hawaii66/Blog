import { createContext } from "react";

interface StaticContext {
    apiEndPoint:string,
    website:string
}

export const StaticContext = createContext<StaticContext>(
    {
        apiEndPoint:"http://localhost:5000",
        website:"http://localhost:3000"
    }
);