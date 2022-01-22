import React, { useEffect, useState, useContext } from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { StaticContext } from '../../Contexts/StaticContext';
import { BlogPreviewInterface } from '../../Interfaces/BlogInterface';

export interface Props{
    blogID:string
}

function BlogPreview({blogID}:Props) {
    const [info,setInfo] = useState<BlogPreviewInterface|null>(null);

    const {website,apiEndPoint} = useContext(StaticContext);

    useEffect(() => {
        getInfo();
    },[]);

    const getInfo = async() => {
        const result = await fetch(`${apiEndPoint}/blog/preview/${blogID}`,{
            method:"GET"
        });
        if(result.status !== 200){return;}

        setInfo(await result.json());
    }

    const link = `/?id=${info?.id}`;

    if(info === null){
        return(
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Placeholder animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                    </Card.Title>
                    <Card.Text>
                        <Placeholder animation="glow">
                            <Placeholder xs={5} />{' '}
                            <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} />{' '}
                            <Placeholder xs={4} />{' '}
                            <Placeholder xs={3} />{' '}
                            <Placeholder xs={8} />{' '}
                        </Placeholder>
                    </Card.Text>
                    <Card.Footer style={{display:"flex",justifyContent:"center"}}>
                        <Placeholder xs={5} bg="primary" />
                    </Card.Footer>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{info.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{new Date(info.date).toLocaleString("sw-SW")}</Card.Subtitle>
                <Card.Text>
                    {info.text}
                </Card.Text>
                <Card.Footer style={{display:"flex",justifyContent:"center"}}>
                    <Card.Link as="div" ><Link to={link}>Read More</Link></Card.Link>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default BlogPreview
