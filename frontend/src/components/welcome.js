import React from 'react'
import styled from 'styled-components'
import LoginButton from './button/LoginButton';
import SignUpButton from './button/SignUpButton';
import { useNavigate } from 'react-router-dom';

const Color = {
    teaGreen: "#C5E7CD",
    metallicBlue: "#3A5874",
    cream: "#FFFBD4",
    deepPeach: "#FFCCAA",
    rackley: "#5A7D9F",
    pastelRed: "#FF6961",
    beauBlue: "#BCD9EC",
    turquoiseGreen: "#A1D4AD",
    orange: "#FF6766",
};

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
                <LoginButton onClick={()=>routeChange('login')}/>
                <SignUpButton onClick={()=>routeChange('signup')}/>
            </GridTwoColumn>
        </MiddleOfPage>
    )
}