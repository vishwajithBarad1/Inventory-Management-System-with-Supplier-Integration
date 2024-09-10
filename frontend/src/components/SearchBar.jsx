import { useState } from 'react';
import '../styles/SearchBar.css';
function SearchBar({setIsSearch,setSearchQuery, getProducts}){
    const [query,setQuery] = useState("")

    function onSearch(){
        if(query){
            setIsSearch(true);
        }
    }
    
    function handleChange(event){
        if((event.target.value).length>0){
            setQuery(event.target.value)
            setSearchQuery(event.target.value)
        }else{
            setIsSearch(false)
            setQuery("")
            getProducts();
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        onSearch();
    }       

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                className="search-input"
            />
            <button className="search-button" onClick={handleSubmit}><svg fill='#fff' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 3 30 20">
<path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
</svg></button>
        </form>
    );
};

export default SearchBar;
