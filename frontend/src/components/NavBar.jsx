import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({page}) => {
    const navigate = useNavigate();
    function handleLogout(){
        localStorage.removeItem("authToken");
        navigate("/");
    }
    function underline(btn){
        if(page==btn){
            return "underline";
        }
    }
    return (
        <div className="dashboard-buttons">
            <div>
            <button onClick={() => navigate('/dashboard')} className="dashboard-button" style={{textDecoration:underline("dashboard"), textDecorationThickness:"2px",textUnderlineOffset:"5px"}}>Dashboard</button>
            <button onClick={() => navigate('/product')} className="dashboard-button" style={{textDecoration: underline("product"), textDecorationThickness:"2px",textUnderlineOffset:"5px"}}>Products</button>
            <button onClick={() => navigate('/suppliers')} className="dashboard-button" style={{textDecoration: underline("supplier"), textDecorationThickness:"2px",textUnderlineOffset:"5px"}}>Suppliers</button>
            <button onClick={() => navigate('/orders')} className="dashboard-button" style={{textDecoration: underline("order"), textDecorationThickness:"2px",textUnderlineOffset:"5px"}}>Orders</button>
            <button onClick={() => navigate('/reports')} className="dashboard-button" style={{textDecoration: underline("report"), textDecorationThickness:"2px",textUnderlineOffset:"5px"}}>Reports</button>
            </div>
            <div>
            <div className='dashboard-buttons-avatar' onClick={handleLogout}>
            <svg className="avatar"height="34px" width="34px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#8B5E3C" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></g></svg>
            <span>
            <svg className='svg-logout' fill="#8B5E3C" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 384.971 394.971">
                    <g>
                        <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                        <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                    </g>
            </svg>
            </span>
            </div>
            </div>
        </div>
    );
};

export default NavBar;
