import React, { Component } from 'react'
import {
  Container,
  Input,
  Button,
  Grid,
} from 'semantic-ui-react'

class SearchBox extends Component {
    state={
        searchText: ''
    }

    render() {
      return (
        <Container>
            <Grid fluid>
                <Grid.Column width={14}>
                    <Input fluid type='text' placeholder='Search...' />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button icon='search' />
                </Grid.Column>
            </Grid>
        </Container>
      );
    }
}

export default SearchBox;

//todo:
//Search on click
//on change method to keep track of search text