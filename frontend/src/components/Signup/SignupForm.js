import React, { useRef, useContext} from 'react'
import styled from 'styled-components'
import ButtonTwo from '../button/ButtonTwo';
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

export default function SignupForm({navigateHandler}) {
    const signupEndpoint= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlQ6bxuJRUZWpS6aTw5wyUN_2p55XawB0'
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const authCtx= useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        fetch(signupEndpoint,{
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
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
            <p>Email*</p>
            <input type="email" id='email' required ref={emailInputRef}/>
          </label>
          <label>
            <p>Password*</p>
            <input type="password" required ref={passwordInputRef}/>
          </label>
          <div>
            <ButtonTwo type="submit" title ="Sign Up"></ButtonTwo>
          </div>
        </form> 
        </MiddleOfPage>
      )
}