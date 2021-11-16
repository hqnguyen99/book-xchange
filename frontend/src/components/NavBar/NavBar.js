import React, {useContext} from 'react'
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
  } from './NavBarElements';

export default function NavBar(){
    const authCtx= useContext(AuthContext);
    const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
    function logoutHandler(){
        authCtx.logout();
        routeChange('/');
    }
    function iconHandler(){
        if(authCtx.isLoggedIn){
            routeChange('/home');
        }
        else {
            routeChange('/');
        }
    }
    return (
        <Nav>
            <Bars />
                    <NavMenu >
                        <NavLink onClick={iconHandler}>Home | </NavLink>
                        {!authCtx.isLoggedIn && <NavLink onClick={()=>routeChange('/login')}>Log in</NavLink>}
                        {!authCtx.isLoggedIn && <NavLink onClick={()=>routeChange('/signup')}>Sign up</NavLink>}
                        {authCtx.isLoggedIn && <NavLink onClick={logoutHandler}>Logout</NavLink>}
                        {authCtx.isLoggedIn && <NavLink onClick={()=>routeChange('/sell')}>Sell</NavLink>}
                    </NavMenu>
            </Nav>
    )
}