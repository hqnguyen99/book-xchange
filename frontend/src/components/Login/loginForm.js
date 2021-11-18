import React, { useRef, useContext} from 'react'
import styled from 'styled-components'
import ButtonOne from '../button/ButtonOne'
import ButtonTwo from '../button/ButtonTwo';
import AuthContext from '../../store/auth-context';
import Url from '../../store/url';

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

export default function LoginForm({navigateHandler}) {
    const loginEndpoint= Url.login_url;
    const loginIdInputRef = useRef();
    const passwordInputRef = useRef();
    const authCtx= useContext(AuthContext)
    
    const handleSubmit = async e => {
        e.preventDefault();
        const enteredLoginId = loginIdInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        fetch(loginEndpoint,{
            method: 'POST',
            body: JSON.stringify({
                login_id: enteredLoginId,
                password: enteredPassword,
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
            authCtx.login(data.accessToken);
            navigateHandler()
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    return(
        <MiddleOfPage>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Login Id*</p>
            <input type="text" id='login_id' required ref={loginIdInputRef}/>
          </label>
          <label>
            <p>Password*</p>
            <input type="password" required ref={passwordInputRef}/>
          </label>
          <div>
            <ButtonOne type="submit" title ="Login"></ButtonOne>
          </div>
        </form>
            <ButtonTwo onClick={navigateHandler} title= "Login as Guest"/> 
        </MiddleOfPage>
      )
}
