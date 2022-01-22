import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useQuery } from '../Utils/Hooks';
import Blog from './Blog/Blog';
import UserHome from './User/UserHome';

function RouterApp() {
    const query = useQuery();
    const location = useLocation();

    useEffect(()=>{
      const id = query.get("id");
      const author = query.get("author");
      if(location.pathname === "/" && id !== null){
        window.location.href = `/view?id=${id}`;
      }
      if(location.pathname === "/" && author !== null){
        window.location.href = `/author?author=${author}`;
      }
    },[location])

    return (
        <Routes>
            <Route path="/" element={
              <>
              
              </>}/>
            <Route 
              path="/view"
              element={<Blog/>}
            />
            <Route
              path="/author" 
              element={<UserHome/>}
            />
          </Routes>
    )
}

export default RouterApp
