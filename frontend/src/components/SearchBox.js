import React, { Component } from 'react'
import {
  Col, Button, FormControl, Form, Glyphicon
} from 'react-bootstrap';

class SearchBox extends Component {
    state={
        searchText: ''
    }

    handleChange = (e) =>{
			this.setState({
				searchText: e.target.value
			})
    }

    render() {
      return (
			<Col md={12}>
				<Form>
					<Col xs={11} md={11}>
						<FormControl 
							type="text"
							placeholder='Search...'
							value={this.state.searchText}
							onChange={this.handleChange}
						/>
					</Col>
					<Col xs={1} md={1}>
						<Button bsStyle="success" type='submit'>
							<Glyphicon glyph='glyphicon glyphicon-search' />
						</Button>
					</Col>
				</Form>
			</Col>
      );
    }
}

export default SearchBox;
