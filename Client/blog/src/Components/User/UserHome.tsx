import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext'
import { useQuery, useWindowSize } from '../../Utils/Hooks';
import BlogPreview from './BlogPreview';

import "./User.css";

function UserHome() {
    const [author, setUser] = useState<{name:string,blogs:string[]}|null>(null);

    const {apiEndPoint} = useContext(StaticContext);
    const {user} = useContext(UserContext);
    const location = useLocation();
    const query = useQuery();
    const [width,heigh] = useWindowSize();

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

    if(width > 992 && user?.id === query.get("author")){
        return (
            <div className='Def6090'>
                <h1>{author?.name}</h1>
                <Row className="g-4" xs={1} sm={2} md={3}>
                    {author?.blogs.map((id,inx)=>{
                        return(
                            <Col key={inx}>
                                <BlogPreview edit renderAuthor={false} blogID={id}/>
                            </Col>
                        )
                    })}
                    <Col>
                        <Button variant="primary">Skapa ny blog</Button>
                    </Col>
                </Row>
            </div>
        )
    }
    return (
        <div className='Def6090'>
            <h1>{author?.name}</h1>
            <Row className="g-4" xs={1} sm={2} md={3}>
                {author?.blogs.map((id,inx)=>{
                    return(
                        <Col key={inx}>
                            <BlogPreview edit={false} renderAuthor={false} blogID={id}/>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default UserHome
