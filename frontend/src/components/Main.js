import React, { Component } from 'react'
import {
  Container,
  Header,
  Grid,
} from 'semantic-ui-react'
import SearchBox from './SearchBox'
import './Main.css'
import Results from './Results';

class Main extends Component {
    render() {
      return (
        <Grid fluid>
            <Grid.Row className='banner'>
                <Container>
                    <Header className='title' as='h1'>Toronto Waste Lookup</Header>
                </Container>
            </Grid.Row>
            <Grid.Row>
                <SearchBox />
            </Grid.Row>
            <Grid.Row>
                {/* Search Results */}
                <Results />
            </Grid.Row>
            <Grid.Row>
                {/* Favourites */}
            </Grid.Row>
        </Grid>
      );
    }
}
export default Main