import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter } from "react-router-dom";
import './Main.css';
import { bindActionCreators } from 'redux';
import Jobs from './jobs/containers/Jobs';
import Applications from './applications/containers/Applications';
import Account from './account/containers/Account';
import NavigationBar from './common/NavigationBar';
import AuthenticationModal from './common/AuthenticationModal';
import RegistrationModal from './common/RegistrationModal';

class Main extends Component {
	state = {
		authenticated: false,
		registerModalOpen: false
	}

	toggleRegistration = (value) => {
		this.setState({
			registerModalOpen: value
		});
	}

	render() {
		return (
			<BrowserRouter>
				<NavigationBar />
				<Container>
					<Route exact path="/" component={Jobs}/>
					<Route exact path="/applications" component={Applications}/>
					<Route exact path="/account" component={Account}/>
					<AuthenticationModal
						open={!this.state.authenticated && !this.state.registerModalOpen} //change to props
						login={this.props.actions.login} //make this
						errorMsg={this.props.errorMsg}
						toggleRegistration={this.toggleRegistration}
					/>
					<RegistrationModal
						open={!this.state.authenticated && this.state.registerModalOpen}
						register={this.props.actions.register}
						errorMsg={this.props.errorMsg}
						toggleRegistration={this.toggleRegistration}
					/>
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