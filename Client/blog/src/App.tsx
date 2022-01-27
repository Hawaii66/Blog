import React, { useContext, useEffect, useState } from 'react';
import Blog from './Components/Blog/Blog';
import MicrosoftLogin from 'react-microsoft-login';
import { User } from './Interfaces/UserInterface';
import { UserContext } from './Contexts/UserContext';
import { StaticContext } from './Contexts/StaticContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useQuery } from './Utils/Hooks';
import UserHome from './Components/User/UserHome';
import RouterApp from './Components/RouterApp';
import { Spinner } from 'react-bootstrap';
import TopNavbar from './Components/TopNavbar';

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState<User|null>(null);

  const microsoftID = process.env.REACT_APP_MICROSOFT_LOGIN || "";

  const {apiEndPoint} = useContext(StaticContext);

  const noLoginPaths = [
    "author",
    "view",
    "search",
    ""
  ]

  const loginWrapper = async (err:boolean,data:{email:string|null,id:string|null}) => {
    if(data.email === null || data.id === null){err = true;}
    await login(err ? true : null, {
      id:data.id,
      account:{
        userName:data.email
      }
    });
  }

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

      sessionStorage.setItem("msid", sendData.microsoftID);
      sessionStorage.setItem("email", sendData.email);

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

  const pathNeedLogin = () => {
    var found = true;
    noLoginPaths.map(i => {
      if(i === window.location.pathname.split("/")[1]){
        found = false;
      }
    });
    return found;
  }

  if(user === null && pathNeedLogin()){
    if(sessionStorage.getItem("msid") === null || sessionStorage.getItem("email") === null){
      return(
        <div className="App">
          <TopNavbar/>
          <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <MicrosoftLogin clientId={microsoftID} authCallback={login} withUserData/>
          </div>
        </div>
      )
    }else{
      loginWrapper(false,{
        email:sessionStorage.getItem("email"),
        id:sessionStorage.getItem("msid")
      });
      return(
        <div className="App">
          <TopNavbar/>
          <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{accessToken:accessToken,user:user,refreshToken:updateAccessToken}}>
        Hello World!
        <TopNavbar/>
        <Router><RouterApp/></Router>
      </UserContext.Provider>
    </div>
  );
}

//{user === null && <MicrosoftLogin clientId={microsoftID} authCallback={login} withUserData/>}

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
