import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav} from 'react-bootstrap';

class NavigationBar extends Component {

	render() {
		return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Job Wizard</Navbar.Brand>
            <Nav justify className="mr-auto">
                <Nav.Link href="/">Jobs</Nav.Link>
                <Nav.Link href="/applications">Applications</Nav.Link>
                <Nav.Link href="/account">Account</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
            </Nav>
        </Navbar>
		);
	}
}

NavigationBar.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default NavigationBar;