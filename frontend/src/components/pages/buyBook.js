import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Header, List } from "semantic-ui-react";
import axios from 'axios'


export default function BuyPage() {
    const location = useLocation();
    const obj = JSON.parse(location.state);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios("https://jsonplaceholder.typicode.com/users/1");
            setData(result.data);
        })();
    }, []);

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>INFO</Header>
                        <List>
                        {data.email}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
