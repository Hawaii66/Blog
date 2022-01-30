import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext'
import { BlogInterface } from '../../Interfaces/BlogInterface';
import { useQuery, useWindowSize } from '../../Utils/Hooks';
import BlogPreview from './BlogPreview';
import EditUser from './EditUser';

import "./User.css";

function UserHome() {
    const [author, setUser] = useState<{name:string,blogs:string[]}|null>(null);
    const [showEdit,setShowEdit] = useState(false);

    const {apiEndPoint, website} = useContext(StaticContext);
    const {user,accessToken,refreshToken} = useContext(UserContext);
    
    const query = useQuery();
    const [width] = useWindowSize();

    const GetUser = useCallback(
        async () => {
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
        },
        [apiEndPoint,query]
    );

    useEffect(()=>{
        GetUser();
    },[user,GetUser])

    const CreateBlog = async () => {
        if(user === null){return;}

        var result = await fetch(`${apiEndPoint}/blog/create`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            }
        });

        if(result.status !== 201){
            var t = await refreshToken();
            result = await fetch(`${apiEndPoint}/blog/create`,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${t}`,
                    "Content-Type":"application/json"
                }
            });

            if(result.status !== 201){
                return;
            }
        }

        var data:BlogInterface = await result.json();
        const link = `/edit/?id=${data.id}`;
        window.location.assign(`${website}${link}`);
    }

    useEffect(()=>{
        GetUser();
    },[GetUser]);

    if(width > 992 && user?.id === query.get("author")){
        console.log("EDIT");
        return (
            <div className='Def6090'>
                <h1>
                    {author?.name}{" "}
                    <Button onClick={()=>setShowEdit(true)} className="Edit"></Button>
                </h1>
                {showEdit && <EditUser setEdit={setShowEdit}/>}
                <Row className="g-4" xs={1} sm={2} md={3}>
                    {author?.blogs.map((id,inx)=>{
                        return(
                            <Col key={inx}>
                                <BlogPreview edit renderAuthor={false} blogID={id}/>
                            </Col>
                        )
                    })}
                    <Col>
                        <Button onClick={CreateBlog} variant="primary">Skapa ny blog</Button>
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
