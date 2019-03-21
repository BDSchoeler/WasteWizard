import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';

class Applications extends Component {

	render() {
		return (
            <Container>
                Applications
            </Container>
		);
	}
}

export default connect(
  (state) => ({
    // items : state.itemReducer.items
  }),
  dispatch => ({
    actions: bindActionCreators({ 
			// fetchItems
		}, dispatch)
  })
)(Applications);