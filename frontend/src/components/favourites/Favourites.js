import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../common/Table';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, fetchFavouriteItems, updateItemFavourite } from '../../actions/itemsActionCreator'


class Favourites extends Component {  
  componentDidMount(){
    this.props.actions.fetchFavouriteItems()
  }

  render() {
    const { favourites, actions, keyword } = this.props;
      return (
        <div>
            {favourites.length !== 0 &&
                <Col md={12}>
                <h3>Favourites</h3>
                </Col>
            }
            <Table items={favourites} actions={actions} keyword={keyword}/>
        </div>
      );
    }
}

Favourites.defaultProps = {
    keyword: null
}

Favourites.propTypes = {
    favourites: PropTypes.arrayOf(PropTypes.any).isRequired,
    actions: PropTypes.shape({
        fetchFavouriteItems: PropTypes.func.isRequired,
        fetchItems: PropTypes.func.isRequired,
        updateItemFavourite: PropTypes.func.isRequired
    }).isRequired,
    keyword: PropTypes.string
}

export default connect(
    (state) => ({
        favourites : state.itemReducer.favourites,
        keyword: state.itemReducer.keyword
    }),
    dispatch => ({
        actions: bindActionCreators({ 
            fetchItems,
            fetchFavouriteItems,
            updateItemFavourite
        }, dispatch)
    })
)(Favourites);
