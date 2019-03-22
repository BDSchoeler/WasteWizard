import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import SearchBox from '../../common/SearchBox';

class Jobs extends Component {

	render() {
		return (
            <Container>
                <SearchBox />
                Jobs
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
)(Jobs);