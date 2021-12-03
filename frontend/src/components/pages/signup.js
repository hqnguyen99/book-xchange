import React from "react";
import { useNavigate } from "react-router";
import SignupForm from "../Signup/SignupForm";

export default function Signup(){
    const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
    return (
        <SignupForm navigateHandler= {()=>routeChange('/login')}></SignupForm>
    )
}