
import './App.css';
import{useState,useEffect} from "react";

const initState={
  title:"",
    price:"",
    imageUrl:"",
}

const getData= (url)=>{
  return fetch(url).then((res) => res.json());
  
}



function App() {
  const[loading,setLoading]=useState(false);
  const[formState,setFormState]=useState(initState);
  const[error,setError]=useState(false);
  const[products,setProducts]=useState([]);

  const fetchAndUpdateData= async ()=>{
    setLoading(true)
    try {
      let data= await getData(`http://localhost:3004/products`);
      setProducts(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAndUpdateData()
  },[])

  const handleChange =(e)=>{
    const{name,value}=e.target;
    
    setFormState({
      ...formState,[name] : value
    })
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
      setLoading(true)

      fetch(`  http://localhost:3004/products`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      }).then((response) => response.json())
      .then(() => {setFormState(initState);
        setLoading(false)
      })
      .catch((error)=>{
        setError(true);
        setLoading(false);
      });
  }
  //console.log(formState)
  console.log(products)

  const{title,price,imageUrl}=formState;
  return loading ? (<h1>Loading...</h1>) : error ? (<h1>Something went wrong</h1>) : (
    <div className="App">
      <div id="product-creation-form">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" placeholder='enter name' value={title} onChange={handleChange}></input><br/>
          </label>
          <label>
            Price:
            <input type="number" name="price" placeholder='enter price' value={price} onChange={handleChange}></input><br/>
          </label>
          <label>
            Image:
            <input type="text" name="imageUrl" placeholder='enter url' value={imageUrl} onChange={handleChange}></input><br/>
          </label>
          <input type="submit" value="create product"></input>
        </form>
      </div><hr /><br />
      <div id='products-display'>
          <h1>products</h1>
      </div>
    </div>
  );
}


