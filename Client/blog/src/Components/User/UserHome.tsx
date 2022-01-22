import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../Contexts/UserContext'
import BlogPreview from './BlogPreview';

function UserHome() {
    const {user} = useContext(UserContext);

    return (
        <div style={{marginLeft:"20%",marginRight:"20%"}}>
            <Row className="g-4" xs={1} md={4}>
                {user?.blogs.map((id,inx)=>{
                    return(
                        <Col>
                            <BlogPreview blogID={id}/>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default UserHome
