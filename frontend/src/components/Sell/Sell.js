import React, { useRef, useContext } from 'react'
import styled from 'styled-components'
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

export default function SellForm({ navigateHandler }) {
  var BookEndpoint = Url.book_url;
  console.log(BookEndpoint)
  const bookNameInputRef = useRef();
  const bookISBNInputRef = useRef();
  const bookInfoInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const priceInputRef = useRef();
  const postalCodeInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault();
    const enteredName = bookNameInputRef.current.value;
    const enteredISBN = bookISBNInputRef.current.value;
    const enteredInfo = bookInfoInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    fetch(BookEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        book_name: enteredName,
        book_ISBN: enteredISBN,
        book_info: enteredInfo,
        email: enteredEmail,
        phone: enteredPhone,
        price: enteredPrice,
        postal_code: enteredPostalCode
      }),
      headers: {
        'Authorization' : "Bearer" + authCtx.accessToken,
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
          <p>Book's Name*</p>
          <input type="text" id='book_name' required ref={bookNameInputRef} />
        </label>
        <label>
          <p>Book's ISBN*</p>
          <input type="text" id='book_ISBN' required ref={bookISBNInputRef} />
        </label>
        <label>
          <p>Book's Info</p>
          <input type="text" id='book_info' required ref={bookInfoInputRef} />
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
          <p>Price*</p>
          <input type="number" min="0.01" step="0.01" id='price' required ref={priceInputRef} />
        </label>
        <label>
          <p>Postal Code</p>
          <input type="text" id='postal_code' required ref={postalCodeInputRef} />
        </label>
        <div>
          <ButtonTwo type="submit" title="Sell Book"></ButtonTwo>
        </div>
      </form>
    </MiddleOfPage>
  )
}