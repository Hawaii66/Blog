import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useQuery } from '../Utils/Hooks';
import Blog from './Blog/Blog';
import Edit from './Edit';
import Home from './Home/Home';
import SearchResults from './Search/SearchResults';
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
            <Home/>}/>
          <Route 
            path="/view"
            element={<Blog edit={false}/>}
          />
          <Route
            path="/author" 
            element={<UserHome/>}
          />
          <Route
            path="/search" 
            element={<SearchResults/>}
          />
          <Route
            path="/edit" 
            element={<Edit/>}
          />
        </Routes>
    )
}

export default RouterApp
