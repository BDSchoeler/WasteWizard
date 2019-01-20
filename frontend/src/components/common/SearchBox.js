import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Col, Button, FormControl, Glyphicon
} from 'react-bootstrap';

class SearchBox extends Component {
    state={
        searchText: ''
    }

    handleChange = (e) => {
			const { fetchItems } = this.props;
			this.setState({
				searchText: e.target.value
			})
			if(e.target.value === ''){
				fetchItems(null);
			}
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
			<Col md={12}>
				<Col xs={11} md={11} className='search-box'>
					<FormControl 
						type="text"
						placeholder='Search...'
						value={this.state.searchText}
						onChange={this.handleChange}
						onKeyPress={this.handleEnterPress}
					/>
				</Col>
				<Col xs={1} md={1} className='search-box'>
					<Button bsStyle="success" onClick={this.handleSearch}>
						<Glyphicon glyph='glyphicon glyphicon-search' />
					</Button>
				</Col>
			</Col>
      );
    }
}

SearchBox.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	fetchItems: PropTypes.func.isRequired,
};

export default SearchBox;
