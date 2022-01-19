import React from 'react';
import Blog from './Components/Blog/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import MicrosoftLogin from 'react-microsoft-login';
import { User } from './Interfaces/UserInterface';

function App() {
  const microsoftID = process.env.REACT_APP_MICROSOFT_LOGIN || "";
  console.log(microsoftID);
  const login = (err:any, data:any) => {
    if(err !== null){
      console.log("Error login in!");
      return;
    }

    const user:User = {
      blogs:[],
      email:data.account.userName,
      microsoftID:data.id,
      id:"",
      images:[],
      name:data.account.name
    }

    var sendData:any = {
      email:user.email,
      name:user.name,
      microsoftID:user.microsoftID
    }

    console.log(data);

    sendData = {
      microsoftID:user.microsoftID+"1",
      id:"1642324962119:344877:user"
    }

    fetch("http://localhost:5000/users/login/microsoft",{
      method:"POST",
      body:JSON.stringify(sendData),
      headers:{
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div className="App">
      Hello World!
      <MicrosoftLogin clientId={microsoftID} authCallback={login}  withUserData/>
      <Blog/>
    </div>
  );
}

export default App;
