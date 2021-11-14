import React, { useRef, useContext} from 'react'
import styled from 'styled-components'
import ButtonOne from '../button/ButtonOne'
import ButtonTwo from '../button/ButtonTwo';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

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

export default function LoginForm() {
    const loginEndpoint= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlQ6bxuJRUZWpS6aTw5wyUN_2p55XawB0'
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const authCtx= useContext(AuthContext)
    const history = useNavigate()
    function routeChange(path){ 
        history(path);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        fetch(loginEndpoint,{
            method: 'POST',
            body: JSON.stringify({
                email: enteredUsername,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = 'Authentication failed!';
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }
    
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            authCtx.login(data.idToken)
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    return(
        <MiddleOfPage>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username*</p>
            <input type="text" id='username' required ref={usernameInputRef}/>
          </label>
          <label>
            <p>Password*</p>
            <input type="password" required ref={passwordInputRef}/>
          </label>
          <div>
            <ButtonOne type="submit" title ="Login"></ButtonOne>
          </div>
        </form>
            <ButtonTwo onClick={()=>routeChange('/home')} title= "Login as Guest"/> 
        </MiddleOfPage>
      )
}
