import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap'

class RegistrationModal extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password1: '',
    password2: '',
    showPassword: false
  }

  onKeyDown(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  goToLogin = () => {
		this.props.toggleRegistration(false);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    // this.props.register({
    //   user: this.state.username,
    //   password: this.state.password
    // });
    this.setState({ password: '' });
  }

  handleErrors(){
  }

  render() {
    const { email, password1, password2, firstname, lastname } = this.state;

    return (
      <Modal show={this.props.open} bsSize='small' >
			  <Modal.Header>
					<Modal.Title>Job Wizard | Registration</Modal.Title>
				</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name and Last Name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control name='firstname' type='text' value={firstname} onChange={this.handleChange} />
                <Form.Control name='lastname' type='text' value={lastname} onChange={this.handleChange}/>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' type='text' value={email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password1' type='password' value={password1} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control onKeyDown={(e) => this.onKeyDown(e)} name='password2' type='password' value={password2} onChange={this.handleChange} />
            </Form.Group>
           	<Form.Group>
							 <Button name='login' variant='info' onClick={this.handleSubmit}> Register </Button>
						</Form.Group>
            <Form.Group>
            	<Button variant='secondary' onClick={this.goToLogin}> Back to login </Button>
						</Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

RegistrationModal.defaultProps = {
  errorMsg: null
}

RegistrationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  errorMsg: PropTypes.shape({
    loginError: PropTypes.arrayOf(PropTypes.any)
  }),
  login: PropTypes.func.isRequired,
  toggleRegistration: PropTypes.func.isRequired
}

export default RegistrationModal;