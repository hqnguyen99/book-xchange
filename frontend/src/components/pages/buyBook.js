import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Grid, Header, List } from "semantic-ui-react";
import styled from 'styled-components'
import SellButton from '../button/SellButton'
import axios from 'axios'


export default function BuyPage() {
    const location = useLocation();
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header>INFO</Header>
                        <List>
                            <List.Content>
                                {location.state.name}
                            </List.Content>
                            <List.Content>{location.state.address}</List.Content>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}