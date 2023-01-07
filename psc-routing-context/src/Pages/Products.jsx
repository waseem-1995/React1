import React from 'react'
import { useState ,useEffect } from 'react'
import {  Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';

const getCurrentPageUrl=(value)=>{
  value=Number(value);
  if(typeof value === "number" && value <=0){
    value=1;
  }
  if(!value){
    value=1;
  }
  return value;
}

const getUrl=(url,sort,orderBy)=>{
  if(sort && orderBy){
    return(url=`${url}&_sort=${sort}&_order=${orderBy}`)
  }
  return url
}

const Products = () => {
  const [data ,setData]=useState([]);
  let [searchParams,setSearchParams]=useSearchParams();
  const [page,setPage]=useState(getCurrentPageUrl(searchParams.get("page"))||1);
  const [orderBy,setOrderBy]=useState("");
  const sort="price"
 
  let limit=3
  useEffect(()=>{

    let apiUrl=getUrl(`http://localhost:8080/products/?_page=${page}&_limit=${limit}`,sort,orderBy)

    fetch(apiUrl)
    .then((res)=>res.json())
    .then((json)=>{console.log(json);
      setData(json)
    })
  },[page,orderBy]);

  useEffect(()=>{
    let paramObj={page,orderBy};
    if(orderBy){
      paramObj.orderBy=orderBy
    }
    setSearchParams(paramObj)
  },[page,orderBy])


  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",flexDirection:"column",
      alignItems:"center",justifyContent:"space-around",gap:"20px",marginTop:"40px"}}>

        <button onClick={()=>{setOrderBy("asc"); setPage(1)}}>ASC</button>
        <button onClick={()=>{setOrderBy("desc") ;setPage(1)}}>DESC</button>
        <button onClick={()=>setOrderBy("")}>REsET</button>

      {data?.map((item)=>{
        return(
          <div key={item.id} >
            <img src={item.image} alt=""  width={200} height={200}/>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <Link to={`/products/${item.id}`}>Product <details></details></Link>
          </div>
        )
      })}

      <div style={{margin:"auto"}}>
        <button disabled={page===1} onClick={()=>setPage(page-1)}>PREV</button>
        <button>CURRENT:{page}</button>
        <button onClick={()=>setPage(page+1)}>NEXT</button>
      </div>
    </div>
    
  )
}

//this is before modification


// const Products = () => {
//   const [data ,setData]=useState([]);
//   let [searchParams,setSearchParams]=useSearchParams();
//   const [page,setPage]=useState(getCurrentPageUrl(searchParams.get("page"))||1);
//   const [orderBy,setOrderBy]=useState("");
//   const sort="price"
 
//   let limit=3
//   useEffect(()=>{
//     fetch(`http://localhost:8080/products/?_page=${page}&_limit=${limit}`)
//     .then((res)=>res.json())
//     .then((json)=>{console.log(json);
//       setData(json)
//     })
//   },[page]);

//   useEffect(()=>{
//     let paramObj={page,orderBy};
//     setSearchParams(paramObj)
//   },[page])


//   return (
//     <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",flexDirection:"column",
//       alignItems:"center",justifyContent:"space-around",gap:"20px",marginTop:"40px"}}>

//         <button onClick={()=>setOrderBy("asc")}>ASC</button>
//         <button onClick={()=>setOrderBy("descsc")}>DESC</button>

//       {data?.map((item)=>{
//         return(
//           <div key={item.id} >
//             <img src={item.image} alt=""  width={200} height={200}/>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <Link to={`/products/${item.id}`}>Product <details></details></Link>
//           </div>
//         )
//       })}

//       <div style={{margin:"auto"}}>
//         <button disabled={page===1} onClick={()=>setPage(page-1)}>PREV</button>
//         <button>CURRENT:{page}</button>
//         <button onClick={()=>setPage(page+1)}>NEXT</button>
//       </div>
//     </div>
    
//   )
// }


export default Products
