import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid, Row
} from 'react-bootstrap';
import SearchBox from './SearchBox';
import './Main.css';
import Results from './Results';
import { bindActionCreators } from 'redux';
import { fetchFavouriteItems } from '../actions/itemsActionCreator'

export class Main extends Component {

		componentDidUpdate(){
			console.log("updated", this.props)
		}

		testAction = (event) => {
			this.props.actions.fetchFavouriteItems()
		}

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
					<button onClick={this.testAction}>Test Redux</button>
        </Grid>
      );
    }
}

export default connect(
  (state) => ({
    items : state.itemReducer.items
  }),
  dispatch => ({
    actions: bindActionCreators({ 
			fetchFavouriteItems
		}, dispatch)
  })
)(Main);