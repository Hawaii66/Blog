import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext'
import { useQuery } from '../../Utils/Hooks';
import BlogPreview from './BlogPreview';

import "./User.css";

function UserHome() {
    const [user, setUser] = useState<{name:string,blogs:string[]}|null>(null);

    const {apiEndPoint} = useContext(StaticContext);
    const location = useLocation();
    const query = useQuery();

    const GetUser = async () => {
        const data = await fetch(`${apiEndPoint}/users/blogs/${query.get("author")}`,{
            method:"GET"
        });
        if(data.status === 200){
            setUser(await (data.json()));
        }else{
            setUser({
                name:"Error loading user, check user id in URL",
                blogs:[]
            });
        }
    }

    useEffect(()=>{
        GetUser();
    },[]);

    return (
        <div className='PreviewParent'>
            <h1>{user?.name}</h1>
            <Row className="g-4" xs={1} sm={2} md={3}>
                {user?.blogs.map((id,inx)=>{
                    return(
                        <Col key={inx}>
                            <BlogPreview blogID={id}/>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default UserHome
