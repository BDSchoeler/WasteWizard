import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

class TableItem extends Component {

	decodeHTML = (description) => {
		let e = document.createElement('td');
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
		const { actions, item, keyword } = this.props;
		const data = {
			data: {
				favourite: !item.favourite,
			}
		};
		this.setState({
			favourite: data.data.favourite
		});
		actions.updateItemFavourite(item.id,data).then(() => {
			actions.fetchFavouriteItems();
			actions.fetchItems(keyword);
		});
	}

  render() {
		const { item } = this.props;
		return (
			<tr>
				<td width="10%"><Glyphicon className={item.favourite ? 'starChecked' : 'starUnchecked'} glyph='glyphicon glyphicon-star' onClick={this.handleFavourite}/></td>
				<td width="40%">{item.title}</td>
				<td width="60%" dangerouslySetInnerHTML={{ __html: this.decodeHTML(this.formatDescription(item.description)) }} />
			</tr>
		);
    }
}

TableItem.defaultProps = {
	keyword: null,
}

TableItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		favourite: PropTypes.bool
	}).isRequired,
	actions: PropTypes.shape({
		fetchItems: PropTypes.func.isRequired,
		fetchFavouriteItems: PropTypes.func.isRequired,
		updateItemFavourite: PropTypes.func.isRequired
	}).isRequired,
	keyword: PropTypes.string,
};

export default TableItem;
