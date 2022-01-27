import React, { useContext, useEffect, useState } from 'react';
import { Alert, Badge, ListGroup } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { BlogInterface } from '../../Interfaces/BlogInterface';
import { User } from '../../Interfaces/UserInterface';
import { useQuery } from '../../Utils/Hooks';

import "./SearchResults.css";

interface SearchResult {
    name:string,
    id:string,
    type:"Blog"|"User"
}

function SearchResults() {
    const [results,setResults] = useState<SearchResult[]>([]);

    const {website,apiEndPoint} = useContext(StaticContext);
    
    const query = useQuery();

    const searchClicked = (id:string,type:SearchResult["type"])=>{
        if(type === "Blog"){
            window.location.assign(`${website}/?id=${id}`);
        }
        if(type === "User"){
            window.location.assign(`${website}/?author=${id}`);
        }
    }

    const search = async() => {
        var search = query.get("search");
        if(search === null){return;}

        const matchedUsers = await fetch(`${apiEndPoint}/users/search/${search}`,{
            method:"Get"
        });
        if(matchedUsers.status !== 200){
            return;
        }

        const matchedBlogs = await fetch(`${apiEndPoint}/blog/search/${search}`,{
            method:"GET"
        });
        if(matchedBlogs.status !== 200){
            return;
        }

        var users:{name:string,id:string}[] = await matchedUsers.json();
        var blogs:{name:string,id:string}[] = await matchedBlogs.json();

        var all:SearchResult[] = [];
        for(var i = 0; i < users.length; i ++){
            all.push({
                name:users[i].name,
                id:users[i].id,
                type:"User"
            });
        }
        
        for(var i = 0; i < blogs.length; i ++){
            all.push({
                name:blogs[i].name,
                id:blogs[i].id,
                type:"Blog"
            });
        }

        setResults(all);
    }

    useEffect(()=>{
        search();
    },[])
  
    return (
        <div className="center">
            
            {results.length > 0 ?
            <ListGroup className="size-40" defaultActiveKey="#link1">
                {results.map(res=>{
                    if(res.type === "Blog"){
                        return(
                            <ListGroup.Item variant="light" action onClick={()=>searchClicked(res.id,res.type)}>
                                <li className="Blog">
                                    {res.name}
                                </li>
                            </ListGroup.Item>
                        )
                    }else{
                        return(
                            <ListGroup.Item variant="light" action onClick={()=>searchClicked(res.id,res.type)}>
                                <li className="User">
                                    {res.name}
                                </li>
                                
                            </ListGroup.Item>
                        )
                    }
                })}
            </ListGroup>
            :
            <Alert variant={"warning"}>
                No User or Blog found with that name
            </Alert>
            }
        </div>    
    );
}

export default SearchResults;
