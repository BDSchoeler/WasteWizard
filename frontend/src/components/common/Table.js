import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table as BTable } from 'react-bootstrap';
import TableItem from './TableItem';

class Table extends Component {

	buildTable=() => {
		const { items, actions, keyword } = this.props;
		return items.map((item) => {
				return (
					<TableItem key={item.id} item={item} actions={actions} keyword={keyword}/>
				)
		})
	}
	render() {
		return (
			<BTable hover>
				<tbody>
					{this.buildTable()}
				</tbody>
			</BTable>
		);
	}
}

Table.default = {
	keyword: null,
}

Table.propTypes = {
	items: PropTypes.arrayOf(PropTypes.any).isRequired,
	actions: PropTypes.shape({
		fetchItems: PropTypes.func.isRequired,
		fetchFavouriteItems: PropTypes.func.isRequired,
		updateItemFavourite: PropTypes.func.isRequired,
	}).isRequired,
	keyword: PropTypes.string,
}

export default Table;
