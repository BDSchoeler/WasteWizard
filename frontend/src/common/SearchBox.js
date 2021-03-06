import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Form
} from 'react-bootstrap';

class SearchBox extends Component {
	state={
		searchText: ''
	}

	handleChange = (e) => {
		this.setState({
			searchText: e.target.value
		});
	}

	handleSearch = () => {
		this.props.handleSearch(this.state.searchText);
	}

	handleEnterPress = (e) => {
		if (e.key === 'Enter') {
			this.handleSearch();
		}
	}

	render() {
		return (
			<Row>
				<Col xs={8} md={10} className='search-box'>
					<Form.Control 
						type="text"
						placeholder='keywords, job titles, companies...'
						value={this.state.searchText}
						onChange={this.handleChange}
						onKeyPress={this.handleEnterPress}
					/>
				</Col>
				<Col xs={4} md={2} className='search-box'>
					<Button variant="info" onClick={this.handleSearch}>
						Find Jobs
					</Button>
				</Col>
			</Row>
		);
	}
}

SearchBox.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	fetchItems: PropTypes.func.isRequired,
};

export default SearchBox;
