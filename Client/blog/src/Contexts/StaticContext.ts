import { createContext } from "react";

interface StaticContext {
    apiEndPoint:string
}

export const StaticContext = createContext<StaticContext>(
    {
        apiEndPoint:"http://localhost:5000"
    }
);