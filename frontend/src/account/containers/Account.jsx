import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Form, Button, Col
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../../actions/authActionCreator';

class Account extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    skills: '',
  }

  componentWillMount(){
    this.props.actions.fetchCurrentUser().then(()=>{
      console.log(this.props)
      // this.setState({
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   address: '',
      //   skills: '',
      // })
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

	render() {
    console.log(this.state)
		return (
      <Container>
        <Form>
          <h2>Account</h2>
            <Form.Row>
             <Form.Group as={Col} controlId="formGrid1">
              <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text" placeholder="First Name"
                  name='firstName' value={this.state.firstName}
                  onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridsecond">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name"
                name='lastName' value={this.state.lastName}
                onChange={this.handleChange}/>
              </Form.Group>
            </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
              name='email' value={this.state.email}
              onChange={this.handleChange}/>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Address"
            name='address' value={this.state.email}
            onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formGridSkills">
            <Form.Label>Skills (comma separated list)</Form.Label>
            <Form.Control placeholder="Skills"
            name='skills' value={this.state.skills}
            onChange={this.handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Account
          </Button>
        </Form>
      </Container>
		);
	}
}

export default connect(
  (state) => ({
    auth : state.authReducer
  }),
  dispatch => ({
    actions: bindActionCreators({ 
			fetchCurrentUser
		}, dispatch)
  })
)(Account);