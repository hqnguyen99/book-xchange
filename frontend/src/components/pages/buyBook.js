import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Header, List } from "semantic-ui-react";
import axios from 'axios'
import AuthContext from '../../store/auth-context';
import styled from 'styled-components'

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
    const authCtx = useContext(AuthContext)
    const location = useLocation();
    const obj = JSON.parse(location.state);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios("https://jsonplaceholder.typicode.com/users/1", {
                headers: {
                    Authorization: "Bearer" + authCtx.accessToken,
                    id: obj.seller_id
                }
            });
            setData(result.data);
        })();
    }, []);

    return (
        <MiddleOfPage>
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <p><h1>BOOK's INFO</h1></p>
                            <List>
                                <List.Content>
                                    <p><i><u>Email</u></i>: {data.email}</p>
                                </List.Content>
                                <List.Content>
                                    <p><i><u>Username</u></i>: {data.username}</p>
                                </List.Content>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </MiddleOfPage>
    );
}