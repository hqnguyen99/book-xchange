import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';


export const Color ={
    background_color: "#5A7D9F",
    color: "white",
    hover_background_color: "#FFCCAA",
    hover_color: "#3A5874",
};
const Button=styled.button`
    padding: 1rem 2rem;
    text-decoration: none;
    text-align: center;
    border-radius: 50px;
    font-weight: 500;
    border: none;
    outline: none;
    width: 12rem;
    transition: background-color 200ms ease-in-out;
    
    &:hover, &:focus {
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }

    &.primary {
        background-color: ${Color.background_color};
        color: ${Color.color};
    }
    &.primary:hover, &.primary:focus {
        background-color: ${Color.hover_background_color};
        color: ${Color.hover_color};
    }
`
export default function BackButton(){
    const history = useNavigate()
    return (
        <Button className="primary" onClick={()=>history('/home')}>Back</Button>
    )
}