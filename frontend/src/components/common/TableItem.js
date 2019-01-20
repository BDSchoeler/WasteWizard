import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table as BTable, Grid, Col, Row } from 'react-bootstrap'

class TableItem extends Component {

	decodeHTML = (description) => {
		let e = document.createElement('div');
		e.innerHTML = description;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

	formatDescription = (description) => {
		if(description[0] !== '&' ) {
			return `&lt;ul&gt;\n&lt;li&gt;${description}&lt;/li&gt;\n&lt;/ul&gt;`;
		}
		return description;
	}

	handleFavourite = () => {
		//action call here
	}

    render() {
			const { item } = this.props;
			return (
				<tr>
					<Col xs={1} md={1}><input className="star" type="checkbox" checked={item.favourite} onChange={this.handleFavourite}/></Col>
					<Col xs={2}  md={2}>{item.title}</Col>
					<Col xs={9} md={9} dangerouslySetInnerHTML={{ __html: this.decodeHTML(this.formatDescription(item.description)) }} />
			</tr>
			);
    }
}

TableItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		favourite: PropTypes.bool
	}).isRequired
};

export default TableItem;
