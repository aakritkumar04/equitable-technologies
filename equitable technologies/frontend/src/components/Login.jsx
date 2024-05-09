import React , { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";


export const Login = (props) => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        id:'',password:''
    });

    let name , value;
    const change = (e) =>
    {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5030/login",user)
        .then((res)=>{
            if(res.data.messages === 1)
            {
                var storage = res.data.token;
                window.localStorage.setItem("token",storage);
                navigate("/home"); 
            }
            else if(res.data.messages === 12)
            {
                alert("Please check your password");
            }
            else{
                alert("Please register first!");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className="login justify-content-center">
            <Nav/>
            <form>
                <input value={user.id} onChange={change} name="id" type="text" placeholder="ID"/>
                <input value={user.password} onChange={change} name="password" type="password" placeholder="Password"/>
                <button type="submit" onClick={handleSubmit}>Log in</button>
                <div className="my-class">
                    <p style={{color:"grey"}} className='link-btn' type="submit" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here</p>
                </div>
            </form>   
            
            {/* <div className="signin">
                <h5>or sign in with :</h5>
                <i className="foot-icons fa-brands fa-twitter"></i>
                <i className="foot-icons fa-brands fa-apple"></i>
                <i className="foot-icons fa-brands fa-google"></i>
                <i className="foot-icons fa-brands fa-facebook"></i>
            </div>      */}
        </div>
    );
}
