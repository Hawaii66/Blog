import React, { useContext, useEffect, useState } from 'react';
import Blog from './Components/Blog/Blog';
import MicrosoftLogin from 'react-microsoft-login';
import { User } from './Interfaces/UserInterface';
import { UserContext } from './Contexts/UserContext';
import { StaticContext } from './Contexts/StaticContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useQuery } from './Utils/Hooks';

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState<User|null>(null);

  const query = useQuery();
  const location = useLocation();

  const microsoftID = process.env.REACT_APP_MICROSOFT_LOGIN || "";

  const {apiEndPoint} = useContext(StaticContext);

  const login = async (err:any, data:any) => {
      if(err !== null){
        return;
      }

      if(accessToken !== "" && refreshToken !== ""){
        return;
      }

      if(user !== null){return;}
  
      var sendData = {
        microsoftID:data.id,
        email:data.account.userName
      }
  
      var loginResult = await GetUserTokens(sendData, apiEndPoint);
      
      var newUser:User|null = null;
      if(loginResult === null){
        newUser = await CreateUser(data, apiEndPoint);
        loginResult = await GetUserTokens(sendData, apiEndPoint);
        if(loginResult === null){return "";}
      }

      const tokens = loginResult;
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);

      const userResult = await fetch(`${apiEndPoint}/users/get`,{
        method:"GET",
        headers:{
          "Authorization": "Bearer " + tokens.accessToken
        }
      });
      if(userResult.status === 200){
        setUser(await userResult.json());
      }
    }

  const updateAccessToken = async() => {
    const token = await UpdateAccessToken(refreshToken,apiEndPoint)
    setAccessToken(token);
    return token;
  }

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
    <div className="App">
      <UserContext.Provider value={{accessToken:accessToken,user:user,refreshToken:updateAccessToken}}>
          Hello World!
          {user === null && <MicrosoftLogin clientId={microsoftID} authCallback={login} withUserData/>}
          <Routes>
            <Route path="/" element={
              <>
              
              </>}/>
            <Route 
              path="/view"
              element={<Blog/>}
            />
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

async function CreateUser(data:any,apiEndPoint:string):Promise<User|null>{
  const sendData:any = {
    email:data.account.userName,
    name:data.account.name,
    microsoftID:data.id
  }

  fetch(`${apiEndPoint}/users/create`,{
    method:"POST",
    body:JSON.stringify(sendData),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json().then(data=>{
    return data;
  }));
  return null;
}

async function GetUserTokens(payload:any,apiEndPoint:string):Promise<{accessToken:string,refreshToken:string}|null>{
  const response = await fetch(`${apiEndPoint}/users/login/microsoft`,{
    method:"POST",
    body:JSON.stringify(payload),
    headers:{
      'Content-Type': 'application/json'
    }
  });

  if(response.status === 400){return null;}
  const tokens = await response.json();

  return {
    accessToken:tokens.accessToken,
    refreshToken:tokens.refreshToken
  }
}

async function UpdateAccessToken(refreshToken:string,apiEndPoint:string):Promise<string> {
  const result = await fetch(`${apiEndPoint}/users/token`,{
    method:"POST",
    body:JSON.stringify({
      token:refreshToken
    }),
    headers:{
      "Content-Type":"application/json"
    }
  });

  if(result.status === 200){
    return (await result.json()).accessToken;
  }

  return "";
}

export default App;
