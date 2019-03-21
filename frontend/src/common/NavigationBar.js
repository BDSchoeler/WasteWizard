import React, { Component } from 'react';
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
                <Nav.Link>Logout</Nav.Link>
            </Nav>
        </Navbar>
		);
	}
}

export default NavigationBar;