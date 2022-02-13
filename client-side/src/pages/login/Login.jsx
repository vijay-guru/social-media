import { useRef,useContext } from 'react';
import './login.css';
import {AuthContext} from '../../context/AuthContext'
import {loginCall} from '../../apiCalls'
import {CircularProgress} from '@material-ui/core'
import { Link } from 'react-router-dom';

function Login() {
    const email =useRef()
    const password =useRef()
    const {user,isFetching,error,dispatch}=useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            {
                email:email.current.value,
                password:password.current.value
            },dispatch);
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
                       placeholder="Email"
                        required type="email"
                         className="loginInput"
                         ref={email}
                          />
                       <input
                        placeholder="Password"
                         required minLength="6"
                          type="password" 
                          className="loginInput"
                          ref={password}
                           />
                       <button type="submit"className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>
                       <span className="loginForgot">Forgot password ?</span>
                      <Link to="/register"><button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size="20px"/> : "Create a new account"}</button></Link> 
                    </form>
                </div>
            </div>
        </div>
        
        );
}

export default Login;
