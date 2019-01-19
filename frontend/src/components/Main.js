import React, { Component } from 'react'
import {
    Grid, Row
} from 'react-bootstrap';
import SearchBox from './SearchBox'
import './Main.css'
import Results from './Results';

class Main extends Component {
    render() {
      return (
        <Grid fluid>
					<Row className='banner'>
						<h1>Toronto Waste Lookup</h1>
					</Row>
					<SearchBox />
					<Results />
					<Row>
							{/* Favourites */}
					</Row>
        </Grid>
      );
    }
}
export default Main