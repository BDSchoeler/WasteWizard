import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Form, Button, Col
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser, updateUser } from '../../actions/authActionCreator';

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
      const user = this.props.auth.currentUser;
      this.setState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        address: user.address || '',
        skills: user.skills || '',
      })
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    const model = {
      id: this.props.auth.currentUser.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      adminStatus: this.props.auth.currentUser.adminStatus,
      address: this.state.address, 
      skills: this.state.skills
    }
    this.props.actions.updateUser(this.props.auth.token, model)
  }

	render() {
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
            name='address' value={this.state.address}
            onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formGridSkills">
            <Form.Label>Skills (comma separated list)</Form.Label>
            <Form.Control placeholder="Skills"
            name='skills' value={this.state.skills}
            onChange={this.handleChange}/>
          </Form.Group>

          <Button variant="primary" onClick={this.handleSubmit}>
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
      fetchCurrentUser,
      updateUser
		}, dispatch)
  })
)(Account);