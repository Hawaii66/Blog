import React, { useRef, useState, useContext } from 'react';
import { Form, Row,Col, Container, Button, Offcanvas, Card } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { BlogImageInterface } from '../../Interfaces/BlogInterface';

export interface Props{
    img:BlogImageInterface|null,
    setImg:(img:BlogImageInterface|null)=>void,
    dir:"Left"|"Right"
}

function ImageSelect({img,setImg,dir}:Props) {
    const [showSelect, setShow] = useState(false);

    const {apiEndPoint} = useContext(StaticContext);

    const fileRef = useRef<HTMLInputElement|null>(null);
    const urlRef = useRef<HTMLInputElement|null>(null);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const ToggleImage = () => {
        if(img === null){
            var newImg:BlogImageInterface|null = {
                alt:"Alternativ text",
                link:"",
                sizeX:"30%",
                sizeY:"5"
            }

            setImg(newImg);
        }
        else
        {
            setImg(null);
        }
    }

    const SetAltText = (e:any) => {
        if(img === null){return;}

        var newImg:BlogImageInterface|null = {
            alt:e.target.value,
            link:img.link,
            sizeX:img.sizeX,
            sizeY:img.sizeY
        }

        setImg(newImg);
    }

    const UseImage = (link:string) => {
        if(img === null){return;}

        var newImg:BlogImageInterface|null = {
            alt:img.alt,
            link:link,
            sizeX:img.sizeX,
            sizeY:img.sizeY
        }

        setImg(newImg);

        if(urlRef === null || urlRef.current === null){return;}
        urlRef.current.value = newImg.link;

        handleHide();
    }

    const UploadFile = async() => {
        if(fileRef === null || fileRef.current === null || fileRef.current.files === null){return;}
        if(fileRef.current.value === ""){return;}

        var form = new FormData();
        form.append("image", fileRef.current.files[0]);

        fileRef.current.value = "";

        var result:any = await fetch(`${apiEndPoint}/images`,{
            method:"POST",
            body:form
        });

        result = await result.json();
        UseImage(`${apiEndPoint}${result.filePath}`);
    }

    if(img === null){
        return(
            <Form.Group>
                <Row style={{width:"20%"}}>
                    <Col xs={2}>
                        <Form.Check checked={img !== null} onChange={ToggleImage}/>
                    </Col>
                    <Col style={{marginBottom:"0.5rem"}}>
                        <Form.Label>{(dir==="Left")?"Vänster":"Höger"} Bild</Form.Label>
                    </Col>
                </Row>
            </Form.Group>
        )
    }

    const links = [
        "https://unsplash.it/500/500",
        "https://unsplash.it/500/500",
        "https://unsplash.it/400/500",
        "https://unsplash.it/500/300",
        "https://unsplash.it/200/200",
        "https://unsplash.it/500/800",
    ]

    return(
        <div>
            <Form.Group>
                <Row style={{width:"20%"}}>
                    <Col xs={2}>
                        <Form.Check checked={img !== null} onChange={ToggleImage}/>
                    </Col>
                    <Col style={{marginBottom:"0.5rem"}}>
                        <Form.Label>Vänster Bild</Form.Label>
                    </Col>
                </Row>
                <Container>
                    <Row className="g-2" style={{textAlign:"right", width:"50%"}}>
                        <Col xs={4}>
                            <Form.Label>Välj Bild:</Form.Label>
                        </Col>
                        <Col style={{marginBottom:"0.5rem"}}>
                            <Form.Control ref={urlRef} type="text" placeholder='URL'/>
                        </Col>
                        <Col xs={2} style={{marginBottom:"0.5rem"}}>
                            <Button onClick={handleShow} className="Icon Upload" variant="primary">
                                
                            </Button>
                        </Col>
                    </Row>
                    <Row className="g-2" style={{textAlign:"right", width:"50%"}}>
                        <Col xs={4}>
                            <Form.Label>Alternativ Text:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control onChange={(e)=>SetAltText(e)} type="text" placeholder='...' />
                        </Col>
                    </Row>
                </Container>
            </Form.Group>

            <Offcanvas style={{width:"80%"}} className="OffcanvasImpBase" placement="end" show={showSelect} onHide={handleHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Dina Bilder
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <Form.Control ref={fileRef} style={{marginBottom:"1rem"}} type="file"/>  
                            </Col>
                            <Col xs={3}>
                                <Button onClick={UploadFile} className="auto center">Ladda upp & välj fil</Button>    
                            </Col>
                        </Row>
                        <Row>
                            {/*
                            <Col style={{marginLeft:"2rem",marginTop:"2rem"}}>
                                <Form.Control className="HideBootstrap Icon Upload Big " type="file"/>
                                <h3 className="auto textCenter">Ladda upp</h3>
                                <h4 className="auto textCenter">Från datorn</h4>
                            </Col>
                            */}
                            {links.map((link,index)=>{
                                return(
                                    <Col key={index}>
                                        <Card onClick={()=>UseImage(link)} key={index} style={{marginBottom:"2rem", width: '18rem'}}>
                                            <Card.Img style={{padding:"0.5rem"}} variant="top" src={link} />
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default ImageSelect;
