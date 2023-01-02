
function Pagination({page,handlePageChange}){
    return(
        <div id='pagination-section'>
        <button disabled={page===1} onClick={()=>handlePageChange(-1)}>PREV</button>
        <button disabled>{page}</button>
        <button  onClick={()=>handlePageChange(+1)}>NEXT</button>
      </div>
    )
}

export default Pagination