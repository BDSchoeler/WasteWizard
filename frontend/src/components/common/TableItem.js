import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Table as BTable, Grid, Col, Row } from 'react-bootstrap'

class TableItem extends Component {

		decodeHTML(description){
			let e = document.createElement('td');
			e.innerHTML = description;
			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
		}

    render() {
			const { item } = this.props;
			console.log(item)
			return (
			<tr>
					<td width='10px' >{item.favourite ? 'fav' : 'hate!'}</td>
					<td>{item.title}</td>
					{/* <td>{item.description}</td> */}
					<td dangerouslySetInnerHTML={{ __html: this.decodeHTML(item.description) }} />
    	</tr>
			);
    }
}

// TableItem.propTypes = {
// 	item: PropTypes.shape({
// 		id: PropTypes.string,
// 		title: PropTypes.string,
// 		description: PropTypes.string,
// 		favourite: PropTypes.bool
// 	}).isRequired
// };

export default TableItem;
