import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid, Row
} from 'react-bootstrap';
import SearchBox from './common/SearchBox';
import './Main.css';
import Results from './items/Results';
import { bindActionCreators } from 'redux';
import { fetchItems } from '../actions/itemsActionCreator'

class Main extends Component {

		handleSearch = (searchText) => {
			const { fetchItems } = this.props.actions;
			fetchItems(searchText)
		}

    render() {
			const { fetchItems } = this.props.actions;
      return (
        <Grid fluid>
					<Row className='banner'>
						<h1>Toronto Waste Lookup</h1>
					</Row>
					<Row>
						<SearchBox handleSearch={this.handleSearch} fetchItems={fetchItems}/>
					</Row>
					<Row>
					<Results />
					</Row>
					<Row>
							{/* Favourites */}
					</Row>
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
			fetchItems
		}, dispatch)
  })
)(Main);