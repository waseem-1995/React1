import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const Links=[
        {path:"/",title:"Home"},
        {path:"/contact",title:"Contact"},
        {path:"/login",title:"Login"},
        {path:"/about",title:"About"},
        {path:"/products",title:"Products"},
    ]

  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
        {Links?.map((link)=>(
            <Link key={link.path} to={link.path}>
                {link.title}
            </Link>
        ))}
      
    </div>
  )
}

export default Navbar
