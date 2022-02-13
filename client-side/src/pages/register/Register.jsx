import axios from 'axios';
import { useRef } from 'react';
import './register.css';
import {useNavigate } from 'react-router'
import {Link} from 'react-router-dom'

function Register() {
    const email =useRef()
    const password =useRef()
    const username =useRef()
    const passwordAgain =useRef()
    const navigate =useNavigate();
    const handleClick = async(e)=>{
          e.preventDefault();
          if(passwordAgain.current.value !== password.current.value){
              passwordAgain.current.setCustomValidity("Password doesnot match!");
          }
          else{
              const user={
                  username:username.current.value,
                  email:email.current.value,
                  password:password.current.value
              };
              try {
                  const res=await axios.post('/auth/register',user);
                  console.log("checking");
                  navigate('/login')
                  console.log("checked");

              } catch (error) {
                  console.log(error);
              }
          }
    }
  return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Vijay Guru</h3>
                    <span className="loginDesc">Connect with your family and friends around you on VijayGuru</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                    <input
                     placeholder="Username"
                     ref={username}
                     className="loginInput"
                      required
                       />
                    <input
                     placeholder="Email"
                    type="email"
                    ref={email}
                    className="loginInput"
                    required 
                         />
                       <input
                        placeholder="Password"
                         type="password"
                         ref={password}
                         className="loginInput"
                         required 
                         minLength="6"
                         />
                       <input
                        placeholder="Re-Enter Password"
                        type="password"
                         ref={passwordAgain}
                         className="loginInput"
                          required 
                          minLength="6"
                          />
                       <button type="submit" className="loginButton">Sign Up</button>
                       <Link to="/login"><button className="loginRegisterButton">Log into an account</button></Link>
                    </form>
                </div>
            </div>
        </div>
        );
}

export default Register;
