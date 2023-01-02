
import './App.css';

import{useState,useEffect} from "react";
import ProductForm from './Components/ProductForm.jsx';
import ProductItem from './Components/ProductItem.jsx';
import Pagination from './Components/Pagination.jsx';


const getData= (url)=>{
  return fetch(url).then((res) => res.json());
  
}



function App() {
  const[loading,setLoading]=useState(false);
 
  const[error,setError]=useState(false);
  const[products,setProducts]=useState([]);
  const[page,setPage]=useState(1)

  const fetchAndUpdateData= async ()=>{
    setLoading(true)
    try {
      let data= await getData(`http://localhost:3004/products?_page=${page}&_limit=3`);
      setProducts(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAndUpdateData(page)
  },[page])

  

  const handleFormSubmit=(formData)=>{
      
      setLoading(true)

      fetch(`  http://localhost:3004/products`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((response) => response.json())
      .then(() => {;
        setLoading(false)
        fetchAndUpdateData(page)
      })
      .catch((error)=>{
        setError(true);
        setLoading(false);
      });
  }
  //console.log(formState)
  console.log(products)

  const handlePageChange=(val)=>{
    const changeBye=page+val;
    setPage(changeBye)
  }
 
  return loading ? (<h1>Loading...</h1>) : error ? (<h1>Something went wrong</h1>) : (
    <div className="App">
      <ProductForm handleFormSubmit={handleFormSubmit} />
      <hr /><br />
      <div id='products-display'>
          <h1>products</h1>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",margin:"25px",gap:"20px"}}>

            {products.map((prod)=>(
              <ProductItem key={prod.id} {...prod}/>
            ))}
          </div>
      </div>
      <Pagination page={page} handlePageChange={handlePageChange} />
    </div>
  );
}

export default App;
