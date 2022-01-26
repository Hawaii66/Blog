import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../Contexts/UserContext'
import BlogPreview from './BlogPreview';

import "./User.css";

function UserHome() {
    const {user} = useContext(UserContext);

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
