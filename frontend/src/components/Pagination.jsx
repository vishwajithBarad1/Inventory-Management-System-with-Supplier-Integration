import React, { useEffect, useState } from 'react';
import "../styles/Pagination.css";

const Pagination = ({setPage,setLimit,totalPages,page,style}) => {
    function gotoNext() {
        if(page<totalPages){
            setPage((page)=>page+1)
        }
    }
    
    function gotoPrev() {
        if(page>1){
            setPage((page)=>page-1)
        }
    }

    return (
        <div className='pagination' style={style}>
            <button onClick={gotoPrev} >Previous</button>
            <h3>Page {page} of {totalPages}</h3>
            <button onClick={gotoNext} >Next</button>
        </div>
    );
};

export default Pagination;