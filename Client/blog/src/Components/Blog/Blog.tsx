import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BlogInterface } from '../../Interfaces/BlogInterface';
import BlogContent from './BlogContent';

function Blog() {
    const blogPost:BlogInterface = {
        title:"First blog post",
        author:"HawaiiDev",
        publishDate:Date.now(),
        language:"EN",        
        content:[
            {
                title:"Chapter 1",
                imgLeft:{
                    link:"https://unsplash.it/200/500",
                    sizeX:"450px",
                    sizeY:"500px",
                    alt:"Random Image"
                },
                imgRight:{
                    link:"https://unsplash.it/500/500",
                    sizeX:"500px",
                    sizeY:"400px",
                    alt:"Random Image"
                },
                text:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae vitae ex velit temporibus error non totam facilis possimus qui labore commodi fugit officiis voluptatibus, harum tempora unde optio illum explicabo eaque consequatur laudantium magni assumenda! In fugit tenetur deleniti architecto repellat veniam incidunt ipsam eaque ab nisi doloremque quae quidem laudantium facere, voluptate sed earum consequatur culpa laboriosam praesentium minima? Odio ab repudiandae quidem at, nulla modi ullam, consectetur voluptatum assumenda exercitationem atque quisquam temporibus veritatis alias voluptatem numquam. Rem voluptatem placeat molestias non eaque! Dolores adipisci ratione unde ea non earum sed, velit omnis. Ratione laboriosam dolore voluptatum laborum dicta, incidunt alias minus eaque quidem ducimus maxime atque, voluptates repudiandae esse asperiores temporibus rem ab? Eligendi doloremque a voluptas molestias ducimus architecto nemo placeat perspiciatis. Beatae ut dolorum corporis quis id debitis aperiam culpa cumque alias consectetur totam, esse perferendis necessitatibus ex vel quo eaque! Numquam consectetur ex inventore rerum veritatis distinctio in ducimus eum, blanditiis fugit sint eos accusantium culpa ipsa necessitatibus accusamus voluptatibus. Culpa sint laboriosam quos ipsum quaerat quisquam saepe autem voluptatum veniam fuga sapiente officiis reprehenderit incidunt illum minima ut sed neque animi beatae deserunt, aut accusantium quod maxime vitae? Quam explicabo fuga et quidem"
            },
            {
                title:"Chapter 1",
                imgLeft:{
                    link:"https://unsplash.it/200/500",
                    sizeX:"1000px",
                    sizeY:"400px",
                    alt:"Random Image"
                },
                imgRight:null,
                text:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae vitae ex velit temporibus error non totam facilis possimus qui labore commodi fugit officiis voluptatibus, harum tempora unde optio illum explicabo eaque consequatur laudantium magni assumenda! In fugit tenetur deleniti architecto repellat veniam incidunt ipsam eaque ab nisi doloremque quae quidem laudantium facere, voluptate sed earum consequatur culpa laboriosam praesentium minima? Odio ab repudiandae quidem at, nulla modi ullam, consectetur voluptatum assumenda exercitationem atque quisquam temporibus veritatis alias voluptatem numquam. Rem voluptatem placeat molestias non eaque! Dolores adipisci ratione unde ea non earum sed, velit omnis. Ratione laboriosam dolore voluptatum laborum dicta, incidunt alias minus eaque quidem ducimus maxime atque, voluptates repudiandae esse asperiores temporibus rem ab? Eligendi doloremque a voluptas molestias ducimus architecto nemo placeat perspiciatis. Beatae ut dolorum corporis quis id debitis aperiam culpa cumque alias consectetur totam, esse perferendis necessitatibus ex vel quo eaque! Numquam consectetur ex inventore rerum veritatis distinctio in ducimus eum, blanditiis fugit sint eos accusantium culpa ipsa necessitatibus accusamus voluptatibus. Culpa sint laboriosam quos ipsum quaerat quisquam saepe autem voluptatum veniam fuga sapiente officiis reprehenderit incidunt illum minima ut sed neque animi beatae deserunt, aut accusantium quod maxime vitae? Quam explicabo fuga et quidem"
            },
            {
                title:"Chapter 1",
                imgLeft:null,
                imgRight:{
                    link:"https://unsplash.it/500/500",
                    sizeX:"500px",
                    sizeY:"400px",
                    alt:"Random Image"
                },
                text:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae vitae ex velit temporibus error non totam facilis possimus qui labore commodi fugit officiis voluptatibus, harum tempora unde optio illum explicabo eaque consequatur laudantium magni assumenda! In fugit tenetur deleniti architecto repellat veniam incidunt ipsam eaque ab nisi doloremque quae quidem laudantium facere, voluptate sed earum consequatur culpa laboriosam praesentium minima? Odio ab repudiandae quidem at, nulla modi ullam, consectetur voluptatum assumenda exercitationem atque quisquam temporibus veritatis alias voluptatem numquam. Rem voluptatem placeat molestias non eaque! Dolores adipisci ratione unde ea non earum sed, velit omnis. Ratione laboriosam dolore voluptatum laborum dicta, incidunt alias minus eaque quidem ducimus maxime atque, voluptates repudiandae esse asperiores temporibus rem ab? Eligendi doloremque a voluptas molestias ducimus architecto nemo placeat perspiciatis. Beatae ut dolorum corporis quis id debitis aperiam culpa cumque alias consectetur totam, esse perferendis necessitatibus ex vel quo eaque! Numquam consectetur ex inventore rerum veritatis distinctio in ducimus eum, blanditiis fugit sint eos accusantium culpa ipsa necessitatibus accusamus voluptatibus. Culpa sint laboriosam quos ipsum quaerat quisquam saepe autem voluptatum veniam fuga sapiente officiis reprehenderit incidunt illum minima ut sed neque animi beatae deserunt, aut accusantium quod maxime vitae? Quam explicabo fuga et quidem"
            },
        ]
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>{blogPost.title}</h1>
            <p 
                style={{
                    textAlign:"center"
                }}>
                <a href={"/author/"+blogPost.author}>{blogPost.author}</a>
                {": "}
                {new Date(blogPost.publishDate).toLocaleString("sw-SW")}
            </p>
            {blogPost.content.map((item,index)=>{
                return(
                    <BlogContent content={item} index={index} />
                )
            })}
        </div>
    )
}

export default Blog
