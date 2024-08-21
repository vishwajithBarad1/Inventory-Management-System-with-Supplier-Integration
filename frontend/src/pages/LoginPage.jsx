import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/loginpage.css"
function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation (could be more complex)
    try{
        if (name && password) {
            if(login){
                const response = await axios.post("http://localhost:4000/user/login",{name:name, password:password});
                if(response.data.success){
                    localStorage.setItem('authToken', response.data.token);
                    navigate("/dashboard");
                }
            }else{
                const response = await axios.post("http://localhost:4000/user/createUser",{name:name, password:password});
                if(response.data.success){
                    localStorage.setItem('authToken', response.data.token);
                    navigate("/dashboard");
                }
            }
          } else {
            alert('Please fill in both fields.');
          }
    }catch(error){
        if(login){
            alert("Login failed please try again");
        }else{
            alert("user alredy exists please try again");
        }
    }
  };
  useEffect(()=>{
    if(localStorage.getItem('authToken')){
      navigate("/dashboard");
      return;
    }
  },[])
  return (
    <div className='container'>
    <div className='loginContainer'>
      {login?<h2>Login</h2>:<h2>sign-up</h2>}
      <form onSubmit={handleSubmit}>
        <div className='inputContainer'>
          <label>name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='inputContainer'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {login?
        <div className='signup'>
          Not a user? <a onClick={()=>{setLogin(false)}}>Sign up</a>
        </div>:<div className='signup'>
          Have an account? <a onClick={()=>{setLogin(true)}}>Login</a>
        </div>
        }
    </div>
    </div>
  );
}

export default LoginPage;
