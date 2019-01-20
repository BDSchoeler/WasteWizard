import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../common/Table';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFavouriteItems, updateItemFavourite } from '../../actions/itemsActionCreator'


class Results extends Component {  
  testAction = (event) => {
    this.props.actions.fetchFavouriteItems()
  }

  render() {
    const { items, actions } = this.props;
      return (
        <div className='results-view'>
          <Table items={items} actions={actions} />
        </div>
      );
    }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default connect(
  (state) => ({
    items : state.itemReducer.items
  }),
  dispatch => ({
    actions: bindActionCreators({ 
      fetchFavouriteItems,
      updateItemFavourite
		}, dispatch)
  })
)(Results);
