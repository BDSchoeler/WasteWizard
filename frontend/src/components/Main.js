import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid, Row
} from 'react-bootstrap';
import SearchBox from './common/SearchBox';
import './Main.css';
import Results from './items/Results';
import { bindActionCreators } from 'redux';
import { fetchItems } from '../actions/itemsActionCreator';
import Favourites from './favourites/Favourites';

class Main extends Component {

		handleSearch = (searchText) => {
			const { fetchItems } = this.props.actions;
			fetchItems(searchText.toLowerCase());
		}

    render() {
			const { fetchItems } = this.props.actions;
      return (
				<div>
				<Row className='banner'>
					<h1>Toronto Waste Lookup</h1>
				</Row>
        <Grid>
					<Row>
						<SearchBox handleSearch={this.handleSearch} fetchItems={fetchItems}/>
					</Row>
					{this.props.items.length !== 0 &&
					<Row>
						<Results />
					</Row>
					}
					<Row>
						<Favourites />
					</Row>
        </Grid>
				</div>
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