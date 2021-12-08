import React, { useRef} from 'react'
import styled from 'styled-components'
import ButtonTwo from '../button/ButtonTwo';
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

export default function SignupForm({ navigateHandler }) {
  var signupEndpoint = Url.signup_url;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const phoneInputRef = useRef();
  const loginIdInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredLoginId = loginIdInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    fetch(signupEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
        phone: enteredPhone,
        password: enteredPassword,
        login_id: enteredLoginId,
        address: enteredAddress,
        postal_code: enteredPostalCode
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Signup failed!';
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message;
          // }

          throw new Error(errorMessage);
        });
      }
    })
      .then(() => {
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
          <p>First Name*</p>
          <input type="text" id='first_name' required ref={firstNameInputRef} />
        </label>
        <label>
          <p>Last Name*</p>
          <input type="text" id='last_name' required ref={lastNameInputRef} />
        </label>
        <label>
          <p>Email*</p>
          <input type="email" id='email' required ref={emailInputRef} />
        </label>
        <label>
          <p>Phone*</p>
          <input type="tel" id='phone' required ref={phoneInputRef} />
        </label>
        <label>
          <p>Login id*</p>
          <input type="text" id='login_id' required ref={loginIdInputRef} />
        </label>
        <label>
          <p>Password*</p>
          <input type="password" required ref={passwordInputRef} />
        </label>
        <label>
          <p>Address*</p>
          <input type="text" required ref={addressInputRef} />
        </label>
        <label>
          <p>Postal Code*</p>
          <input type="text" required ref={postalCodeInputRef} />
        </label>
        <div>
          <ButtonTwo type="submit" title="Sign Up"></ButtonTwo>
        </div>
      </form>
    </MiddleOfPage >
  )
}