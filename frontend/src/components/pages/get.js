import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Grid, Header, List } from "semantic-ui-react";
import styled from 'styled-components'
import SellButton from '../button/SellButton'
import axios from 'axios'


function getFromAPI(url, callback){
    var obj;
    fetch(url)
      .then(res => res.json())
      .then(data => obj = data)
      .then(() => callback(obj))
   }

getFromAPI('https://jsonplaceholder.typicode.com/posts/1', BuyPage);


function Get(Obj1) {
    return Obj1
}
