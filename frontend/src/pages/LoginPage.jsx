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
    try {
        if (name && password) {
            let response;
            if (login) {
                response = await axios.post("http://localhost:4000/user/login", { name, password });
            } else {
                response = await axios.post("http://localhost:4000/user/createUser", { name, password });
            }

            if (response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                navigate("/dashboard");
            }
        } else {
            alert('Please fill in both fields.');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          if(error.response.data.message.includes('"password" with value')){
            alert("Invalid password, \nplease enter a stronger password with Minimum 8 characters. \nMaximum Length up to 20 or 30 characters. \nAt least one uppercase letter (A-Z). \nAt least one lowercase letter (a-z). \nAt least one numeric digit (0-9). \nAt least one special character (e.g., !@#$%^&*).\nNo spaces allowed.");
            return;
          }
          if(error.response.data.message.includes('"name" with value ')){
            alert("Invalid name, \nplease enter a valid name with no special characters");
            return;
          }
          if(error.response.data.message.includes('E11000 duplicate key error collection:')){
            alert("user already exists, try logging in");
            return;
          }
            alert(error.response.data.message);
        } else {
            alert('An unexpected error occurred.');
        }
    }
};
  useEffect(()=>{
    if(localStorage.getItem('authToken')){
      navigate("/dashboard");
      return;
    }
  })
  return (
    <div className='container'>
    <div className='loginContainer'>
      {login?<h2>Login</h2>:<h2>sign-up</h2>}
      <form onSubmit={handleSubmit}>
        <div className='inputContainer'>
          <label>Name:</label>
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
        {login&&<button type="submit">Login</button>}
        {!login&&<button type="submit">signin</button>}
      </form>
      {login?
        <div className='signup'>
          Not a user? <button onClick={()=>{setLogin(false)}}>Sign up</button>
        </div>:<div className='signup'>
          Have an account? <button onClick={()=>{setLogin(true)}}>Login</button>
        </div>
        }
    </div>
    </div>
  );
}

export default LoginPage;
