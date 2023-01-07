import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const AuthContext=createContext();



const AuthContextProvider = ({children}) => {

    const [isAuth,setisAuth]=useState(false);
    const [token,setToken]=useState("")

    const login=()=>{
        setisAuth(true)
        setToken(token)
    }
    console.log("token",token)

    const logout=()=>{
        setisAuth(false)
        setToken("")
    }

  return (
    <AuthContext.Provider value={{login,logout,isAuth}}>
      {children}
    </AuthContext.Provider>
  )
}
 
export default AuthContextProvider
