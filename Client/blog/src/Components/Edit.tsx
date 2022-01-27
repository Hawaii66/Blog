import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { StaticContext } from '../Contexts/StaticContext';
import { UserContext } from '../Contexts/UserContext';
import { BlogInterface } from '../Interfaces/BlogInterface';
import { useQuery } from '../Utils/Hooks';
import Blog from './Blog/Blog';

function Edit() {
    const [loading, setLoading] = useState(true);

    const {apiEndPoint} = useContext(StaticContext);
    const {user} = useContext(UserContext);
    const query = useQuery();

    useEffect(()=>{
        const GetUser = async()=>{
            const blogAuthor = await fetch(`${apiEndPoint}/blog/${query.get("id")}`,{
                method:"GET"
            });
            if(blogAuthor.status !== 200){return;}

            var blogPost:BlogInterface = await blogAuthor.json();
            
            if(user === null){return;}

            if(blogPost.author === user.id){
                setLoading(false);
            }
        }

        GetUser();
    },[]);

    if(loading){
        return(
            <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return(
        <Blog edit/>
    )
}

export default Edit;
