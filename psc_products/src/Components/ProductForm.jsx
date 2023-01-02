import{useState} from "react"


const initState={
    title:"",
    price:"",
    imageUrl:"",
}

function ProductForm({hanFormSubmit}){
    const[formState,setFormState]=useState(initState);

    const handleChange =(e)=>{
        const{name,value}=e.target;
        
        setFormState({
          ...formState,[name] : value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        hanFormSubmit(FormData);
        formState(initState)
    }

    const{title,price,imageUrl}=formState;

    return(
        <div>
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
      </div> 
        </div>
    )
}

export default ProductForm