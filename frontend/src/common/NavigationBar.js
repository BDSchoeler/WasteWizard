import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './nav.css';

class NavigationBar extends Component {

	render() {
		return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Job Wizard</Navbar.Brand>
            <Nav justify className="mr-auto">
                <NavItem className='navItem'><Link className='navItem' to="/">Jobs</Link></NavItem>
                <NavItem className='navItem'><Link className='navItem' to="/applications">Applications</Link></NavItem>
                <NavItem className='navItem'><Link className='navItem' to="/account">Account</Link></NavItem>
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