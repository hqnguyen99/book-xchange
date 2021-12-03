import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, List } from "semantic-ui-react";
import axios from 'axios'
import AuthContext from '../../store/auth-context';
import styled from 'styled-components'
import Url from '../../store/url';
import BackButton from '../button/BackButton';

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

export default function BuyPage() {
    var BookEndpoint = Url.book_by_ID;
    const authCtx = useContext(AuthContext)
    const location = useLocation();
    const obj = JSON.parse(location.state);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios(BookEndpoint, {
                headers: {
                    Authorization: "Bearer " + authCtx.accessToken,
                    id: obj.id
                }
            });
            console.log(result.data.books)
            setData(result.data.books[0]);
        })();
    }, []);

    console.log(data)
    console.log(obj)

    return (
        <MiddleOfPage>
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <p><h1>BOOK's INFO</h1></p>
                            <List>
                                <List.Content>
                                    <p><i><u>Name</u></i>: {data.title}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Author</u></i>: {data.author}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Edition</u></i>: {data.edition}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>ISBN</u></i>: {data.isbn}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Publisher</u></i>: {data.publisher}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Price</u></i>: {data.price}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Seller ID</u></i>: {data.seller_id}</p>
                                </List.Content>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <BackButton type="submit" title="Go Back"></BackButton>
        </MiddleOfPage>
    );
}