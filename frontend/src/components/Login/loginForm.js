import React, { useRef, useContext } from 'react'
import styled from 'styled-components'
import ButtonOne from '../button/ButtonOne'
import ButtonTwo from '../button/ButtonTwo';
import AuthContext from '../../store/auth-context';
import Url from '../../store/url';

const MiddleOfPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default function LoginForm({ navigateHandler }) {
  const loginEndpoint = Url.login_url;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext)


  const handleSubmit = async e => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    await fetch(loginEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then((data) => {
          
          let errorMessage = res.status + '\n';
           /* if (data && data.error) {
             errorMessage += data.error;
           } */

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
  return (
    <MiddleOfPage>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email*</p>
          <input type="text" id='email' required ref={emailInputRef} />
        </label>
        <label>
          <p>Password*</p>
          <input type="password" required ref={passwordInputRef} />
        </label>
        <div>
          <ButtonOne type="submit" title="Login"></ButtonOne>
        </div>
      </form>
      <ButtonTwo onClick={navigateHandler} title="Login as Guest" />
    </MiddleOfPage>
  )
}
