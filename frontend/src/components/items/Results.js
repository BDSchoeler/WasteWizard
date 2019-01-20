import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../common/Table';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, fetchFavouriteItems, updateItemFavourite } from '../../actions/itemsActionCreator';


class Results extends Component {  

  render() {
    const { items, actions, keyword } = this.props;
      return (
        <Col md={12}>
          <Table items={items} actions={actions} keyword={keyword} />
        </Col>
      );
    }
}

Results.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    actions: PropTypes.shape({
      fetchFavouriteItems: PropTypes.func.isRequired,
      fetchItems: PropTypes.func.isRequired,
      updateItemFavourite: PropTypes.func.isRequired
    }).isRequired,
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
