import React from 'react'
import styled from 'styled-components'
import ButtonOne from '../button/ButtonOne';
import ButtonTwo from '../button/ButtonTwo';
import { useNavigate } from 'react-router-dom';


const Logo = styled.h1`
    font-family: 'Great Vibes', cursive;
    font-size: 5rem;
    margin-bottom: 2rem;
    text-align: center;
`;
const MiddleOfPage= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const GridTwoColumn= styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
`;

export default function Welcome(){
    const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
    return (
        <MiddleOfPage>
            <Logo> BookXChange</Logo>
            <GridTwoColumn>
                <ButtonOne onClick={()=>routeChange('/login')} title= "Log In"/>
                <ButtonTwo onClick={()=>routeChange('/signup')} title= "Sign Up"/>
            </GridTwoColumn>
        </MiddleOfPage>
    )
}