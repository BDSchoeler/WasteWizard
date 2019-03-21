import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Navbar, Nav
} from 'react-bootstrap';
import {
	Route,
	NavLink,
	BrowserRouter
  } from "react-router-dom";
import './Main.css';
import { bindActionCreators } from 'redux';
import Jobs from './jobs/containers/Jobs';
import Applications from './applications/containers/Applications';
import Account from './account/containers/Account';
import NavigationBar from './common/NavigationBar';

class Main extends Component {

	render() {
		return (
			<BrowserRouter>
				<NavigationBar />
				<Container>
					<Route exact path="/" component={Jobs}/>
					<Route exact path="/applications" component={Applications}/>
					<Route exact path="/account" component={Account}/>
				</Container>
			</BrowserRouter>
		);
	}
}

export default connect(
  (state) => ({
    // items : state.itemReducer.items
  }),
  dispatch => ({
    actions: bindActionCreators({ 
			// fetchItems
		}, dispatch)
  })
)(Main);