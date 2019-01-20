import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table as BTable, Col } from 'react-bootstrap'
import TableItem from './TableItem'

class Table extends Component {

	buildTable=() => {
		const { items } = this.props;
		return items.map((item) => {
				return (
					<TableItem key={item.id} item={item} />
				)
		})
	}
	render() {
		return (
				<Col md={12}>
					<BTable hover>
						<tbody>
							{this.buildTable()}
						</tbody>
					</BTable>
				</Col>
		);
	}
}

Table.propTypes = {
	items: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Table;
