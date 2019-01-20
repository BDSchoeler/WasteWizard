import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../common/Table';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, fetchFavouriteItems, updateItemFavourite } from '../../actions/itemsActionCreator'


class Results extends Component {  

  render() {
    const { items, actions, keyword } = this.props;
      return (
        <div className='results-view'>
          <Table items={items} actions={actions} keyword={keyword} />
        </div>
      );
    }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  keyword: PropTypes.string.isRequired,
}

export default connect(
  (state) => ({
    items : state.itemReducer.items,
    keyword : state.itemReducer.keyword,
  }),
  dispatch => ({
    actions: bindActionCreators({ 
      fetchItems,
      fetchFavouriteItems,
      updateItemFavourite
		}, dispatch)
  })
)(Results);
