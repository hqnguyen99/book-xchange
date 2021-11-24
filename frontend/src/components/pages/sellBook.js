import React from "react";
import { useNavigate } from "react-router";
import SellForm from "../Sell/SellForm";

export default function SellPage(){
    const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
    return (
        <SellForm navigateHandler= {()=>routeChange('/home')}></SellForm>
    )
}