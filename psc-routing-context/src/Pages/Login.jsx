import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';


const Login = () => {

  const {login,isAuth}=useContext(AuthContext);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=()=>{
    const userDetails={email,password,};

    fetch("https://reqres.in/api/login",{
      method:"POST",
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res)=>res.json())
    .then((json)=>{
      //console.log(json)//token
      login(json.token)
    })
    .catch((err)=>{
      console.log("error")
    });
  }

  if(isAuth){
    return <Navigate to="/" />
  }

  

  return (
    <div>
      <h1>login page</h1><br />
      <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
