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
  var BookEndpoint = Url.add_book;
  console.log(BookEndpoint)
  const bookNameInputRef = useRef();
  const bookISBNInputRef = useRef();
  const bookAuthorInputRef = useRef();
  const editionInputRef = useRef();
  const publisherInputRef = useRef();
  const priceInputRef = useRef();
  const sellerIDInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault();
    const enteredName = bookNameInputRef.current.value;
    const enteredISBN = bookISBNInputRef.current.value;
    const enteredAuthor = bookAuthorInputRef.current.value;
    const enteredEdition = editionInputRef.current.value;
    const enteredPublisher = publisherInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredSellerID = sellerIDInputRef.current.value;
    fetch(BookEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        title: enteredName,
        isbn: enteredISBN,
        author: enteredAuthor,
        edition: enteredEdition,
        publisher: enteredPublisher,
        price: enteredPrice,
        seller_id: enteredSellerID
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
          <input type="text" id='title' required ref={bookNameInputRef} />
        </label>
        <label>
          <p>Book's ISBN*</p>
          <input type="text" id='isbn' required ref={bookISBNInputRef} />
        </label>
        <label>
          <p>Book's Author</p>
          <input type="text" id='author' required ref={bookAuthorInputRef} />
        </label>
        <label>
          <p>Book's Edition*</p>
          <input type="text" id='edition' required ref={editionInputRef} />
        </label>
        <label>
          <p>Book's Publisher*</p>
          <input type="text" id='publisher' required ref={publisherInputRef} />
        </label>
        <label>
          <p>Price*</p>
          <input type="number" min="0.01" step="0.01" id='price' required ref={priceInputRef} />
        </label>
        <label>
          <p>Seller ID*</p>
          <input type="text" id='seller_id' required ref={sellerIDInputRef} />
        </label>
        <div>
          <ButtonTwo type="submit" title="Sell Book"></ButtonTwo>
        </div>
      </form>
    </MiddleOfPage>
  )
}