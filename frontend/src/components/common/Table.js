import React, { Component } from 'react'
import { Table as BTable, Col } from 'react-bootstrap'
import TableItem from './TableItem'

const testData = [
	{
			id: "2ae3e7d4-034f-40f3-a5b2-326735d525ae",
			title: "Oversize (home items)",
			description: "Items that would never fit in your Garbage Bin, when empty, are considered oversize and collected curbside. Please place this item 0.5 metre (2 feet) away from your Garbage Bin on your scheduled garbage collection day for free pick-up. Bag tags are not required.",
			favourite: true
	},
	{
			id: "150d8faf-d8b9-4f86-84bb-28ea7b509bfc",
			title: "Blue Bin (foam)",
			description: "&lt;ul&gt;\n&lt;li&gt;Empty and rinse (if necessary and possible) this item before placing it in your &lt;strong&gt;Blue Bin&lt;/strong&gt;.&lt;/li&gt;\n&lt;li&gt;Any type of black foam is not accepted and should be placed in the &lt;strong&gt;Garbage Bin&lt;/strong&gt;.&lt;/li&gt;\n&lt;/ul&gt;",
			favourite: false
	},
	{
		id: "ec7ed1ca-75f2-4c7c-8ed3-6879e4cbfe47",
		title: "Garbage (takeout coffee cup)",
		description: `&lt;ul&gt;\n&lt;li&gt;Place item in the &lt;strong&gt;Garbage Bin.&lt;/strong&gt;&lt;/li&gt;\n&lt;li&gt;If applicable, remove plastic lid and place in &lt;strong&gt;Blue Bin&lt;/strong&gt;. Place black and compostable plastic lids and any straw in the &lt;strong&gt;Garbage Bin&lt;/strong&gt;.&lt;/li&gt;\n&lt;/ul&gt;`,
		favourite: false
	}
]

class Table extends Component {

	buildTable=() => {
		return testData.map((item) => {
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

export default Table;
