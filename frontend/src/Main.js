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
import { login, logout, register, fetchCurrentUser } from './actions/authActionCreator';

class Main extends Component {
	state = {
		registerModalOpen: false
	}

	componentWillMount(){
		this.props.actions.fetchCurrentUser();
	}

	toggleRegistration = (value) => {
		this.setState({
			registerModalOpen: value
		});
	}


	render() {
		const { auth, actions } = this.props;
		return (
			<div>
				<NavigationBar logout={actions.logout}/>
				<Container>
					{auth.authenticated ? (
					<Switch>
						<Route exact path="/" component={Jobs}/>
						<Route path="/applications" component={Applications}/>
						<Route path="/account" component={Account}/>
					</Switch>
					) : (<div>
					<AuthenticationModal
						open={!auth.authenticated && !this.state.registerModalOpen} //change to props
						login={actions.login}
						toggleRegistration={this.toggleRegistration}
						auth={auth}
					/>
					<RegistrationModal
						open={!auth.authenticated && this.state.registerModalOpen}
						register={actions.register}
						toggleRegistration={this.toggleRegistration}
						auth={auth}
					/>
					</div>)
					}
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
		login: PropTypes.func.isRequired,
		logout: PropTypes.func.isRequired,
		register: PropTypes.func.isRequired,
		fetchCurrentUser: PropTypes.func.isRequired,
	}).isRequired
}

export default withRouter(connect(
  (state) => ({
	auth : state.authReducer
  }),
  dispatch => ({
    actions: bindActionCreators({ 
		login,
		logout,
		register,
		fetchCurrentUser,
		}, dispatch)
  })
)(Main));