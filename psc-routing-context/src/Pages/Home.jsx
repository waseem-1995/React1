import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Home = () => {
  const {token,isAuth}=useContext(AuthContext);
  return (
    <div>
      <h1>home</h1>
      this is <h1>token-{token}</h1>
    </div>
  )
}

export default Home
