import React from 'react'
import styled from 'styled-components'

const Color ={
    background_color: "#FFFBD4",
    color: "#3A5874",
    hover_background_color: "#A1D4AD",
    hover_color: "white",
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
export default function SignUpButton(){
    return (
        <Button className="primary">Sign Up</Button>
    )
}