import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { StaticContext } from '../../Contexts/StaticContext';
import { BlogPreviewInterface } from '../../Interfaces/BlogInterface';
import BlogPreview from '../User/BlogPreview';

function Home() {
  const [previews, setPreviews] = useState<BlogPreviewInterface[]|null>(null);

  const {apiEndPoint} = useContext(StaticContext);

  useEffect(()=>{
    const GetPreviews = async() => {
      const results = await fetch(`${apiEndPoint}/blog/last/0/10`,{
        method:"GET"
      });

      if(results.status !== 200){
        console.log("EWrror");
        return;
      }
      console.log("test");
      setPreviews(await results.json());
    }

    GetPreviews();
  },[]);

  if(previews === null){
    return(
      <div>
        Empty
      </div>
    )
  }

  return(
      <div className="center">
          <Row style={{width:"60%"}} className="g-4" xs={1} sm={2} md={2}>
                {previews.map((blog,inx)=>{
                    return(
                        <Col key={inx}>
                            <BlogPreview renderAuthor blogID={blog.id}/>
                        </Col>
                    )
                })}
            </Row>
      </div>
  )
}

export default Home;
