import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Route, withRouter, Switch } from "react-router-dom";
import './Main.css';
import { bindActionCreators } from 'redux';
import Jobs from './jobs/containers/Jobs';
import Applications from './applications/containers/Applications';
import Account from './account/containers/Account';
import NavigationBar from './common/NavigationBar';
import AuthenticationModal from './authentication/components/AuthenticationModal';
import RegistrationModal from './authentication/components/RegistrationModal';
import { login } from './actions/authActionCreator';

class Main extends Component {
	state = {
		authenticated: this.props.auth.authenticated,
		registerModalOpen: false
	}

	componentDidMount(){
		console.log("component did mount")
	}

	getDerivedStateFromProps(){
		console.log("component will receiver")
	}

	toggleRegistration = (value) => {
		this.setState({
			registerModalOpen: value
		});
	}

	//Todo: Should be an action instead that clears the store values!
	logout = () => {
		this.setState({
			authenticated: false,
			registrationModalOpen: false,
		})
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<NavigationBar logout={this.logout}/>
				<Container>
					<Switch>
						<Route exact path="/" component={Jobs}/>
						<Route exact path="/applications" component={Applications}/>
						<Route exact path="/account" component={Account}/>
					</Switch>
					<AuthenticationModal
						open={!this.state.authenticated && !this.state.registerModalOpen} //change to props
						login={this.props.actions.login}
						errorMsg={this.props.errorMsg}
						toggleRegistration={this.toggleRegistration}
						auth={this.props.auth}
					/>
					<RegistrationModal
						open={!this.state.authenticated && this.state.registerModalOpen}
						register={this.props.actions.register}
						errorMsg={this.props.errorMsg}
						toggleRegistration={this.toggleRegistration}
					/>
				</Container>
			</div>
		);
	}
}

Main.defaultProps = {
	auth: {
		authenticated: false,
		err: null,
	}
}
  
Main.propTypes = {
	auth: PropTypes.shape({}),
	actions: PropTypes.shape({
		login: PropTypes.func.isRequired
	}).isRequired
}

export default withRouter(connect(
  (state) => ({
	auth : state.authReducer
    // items : state.itemReducer.items
  }),
  dispatch => ({
    actions: bindActionCreators({ 
		login
			// fetchItems
		}, dispatch)
  })
)(Main));