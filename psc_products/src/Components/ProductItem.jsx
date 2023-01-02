

function ProductItem({title,imageUrl,price}){
    return(
      <div>
        <img src={imageUrl} width="300px" height="300px" />
        <h3>title:{title}</h3>
        <h3>price:{price}</h3>
      </div>
    )
}

export default ProductItem