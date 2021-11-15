import React, {useState} from 'react'
import styled from 'styled-components'
import SellButton from '../button/SellButton'
import axios from 'axios'

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
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
export default function SellPage() {
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Email, setEmail] = useState();
    const [Mobile, setMobile] = useState();
    const [Price, setPrice] = useState();
    const [Tag, setTag] = useState();
    return(
        <MiddleOfPage>
        <form>
          <label>
            <p>Name*</p>
            <input type="text" onChange={e=> setName(e.target.value)}/>
          </label>
          <label>
            <p>Description*</p>
            <input type="text" onChange={e=>setDescription(e.target.value)}/>
          </label>
          <label>
            <p>Email*</p>
            <input type="text" onChange={e=> setEmail(e.target.value)}/>
          </label>
          <label>
            <p>Mobile*</p>
            <input type="number" onChange={e=>setMobile(e.target.value)}/>
          </label>
          <label>
            <p>Price*</p>
            <input type="number" onChange={e=> setPrice(e.target.value)}/>
          </label>
          <label>
            <p>Tag*</p>
            <input type="text" onChange={e=>setTag(e.target.value)}/>
          </label>
          <div>
            <SellButton type="submit">Submit</SellButton>
          </div>
        </form>
        </MiddleOfPage>
      )
}