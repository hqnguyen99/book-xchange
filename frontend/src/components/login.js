import React, {useState} from 'react'
import styled from 'styled-components'
import LoginButton from './button/LoginButton'
import PropTypes from 'prop-types';
import { Color } from './button/LoginButton'

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
async function loginUser(credentials) {
    return fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }
    return(
        <MiddleOfPage>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username*</p>
            <input type="text" onChange={e=> setUserName(e.target.value)}/>
          </label>
          <label>
            <p>Password*</p>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
          </label>
          <div>
            <LoginButton type="submit">Login</LoginButton>
          </div>
        </form>
        </MiddleOfPage>
      )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };