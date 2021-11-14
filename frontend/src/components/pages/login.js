import React from "react";
import LoginForm from "../Login/loginForm";
import { useNavigate } from "react-router";

export default function Login(){
  const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
  return (
    <LoginForm navigateHandler= {()=>routeChange('/home')} />
  )
}