import React, { useRef, useContext} from 'react'
import styled from 'styled-components'
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

export default function SignupForm({navigateHandler}) {
    const signupEndpoint= Url.signup_url;
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const lastNameInputRef = useRef();
    const phoneInputRef = useRef();
    const authCtx= useContext(AuthContext)

    const handleSubmit = async e => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredName= nameInputRef.current.value;
        const enteredLastName= lastNameInputRef.current.value;
        const enteredPhone= phoneInputRef.current.value;
        fetch(signupEndpoint,{
            method: 'POST',
            body: JSON.stringify({
                name: enteredName,
                lastName: enteredLastName,
                email: enteredEmail,
                phone: enteredPhone,
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
            authCtx.login(data.accessToken)
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
            <p>Name*</p>
            <input type="text" id='name' required ref={nameInputRef}/>
          </label>
          <label>
            <p>Last name*</p>
            <input type="text" id='lastName' required ref={lastNameInputRef}/>
          </label>
          <label>
            <p>Email*</p>
            <input type="email" id='email' required ref={emailInputRef}/>
          </label>
          <label>
            <p>Phone*</p>
            <input type="number" id='phone' required ref={phoneInputRef}/>
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