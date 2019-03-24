import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import { Modal, Form, Button, InputGroup, Alert } from 'react-bootstrap'

class AuthenticationModal extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false
  }

  onKeyDown(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
	}
	
	toggleShowPass = () => {
		this.setState(prevState => ({
			showPass: !prevState.showPass
		}));
	}

	  
	goToRegister = () => {
		this.props.toggleRegistration(true);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({ password: '' });
  }

  render() {
    const {	email, password } = this.state;

    return (
      <Modal backdrop='static' show={this.props.open} bsSize='small' >
			  <Modal.Header>
					<Modal.Title>Job Wizard | Login</Modal.Title>
				</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' type='text' value={email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
							<InputGroup className="mb-3">
								<Form.Control
									onKeyDown={(e) => this.onKeyDown(e)}
									name='password'
									type={this.state.showPass ? 'text' : 'password' }
									value={password}
									onChange={this.handleChange} 
									aria-describedby="show-addon"
								/>
								<InputGroup.Append>
									<Button onClick={this.toggleShowPass} variant="outline-secondary">Show</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>
            { this.props.auth.err &&
              <Alert variant='danger'>
                {this.props.auth.err}
              </Alert>
            }
           	<Form.Group>
							 <Button name='login' variant='info' onClick={this.handleSubmit}> Login </Button>
						</Form.Group>
						<Form.Group>
            	<Button variant='secondary' onClick={this.goToRegister}> Need an account? Register now! </Button>
						</Form.Group>
          </Form>
          <ReCAPTCHA
    sitekey="6LdjlJkUAAAAADLRAQK5n59wP-02q2v0BMNUNiG_"
  />
        </Modal.Body>
      </Modal>
    );
  }
}

AuthenticationModal.defaultProps = {

}

AuthenticationModal.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	toggleRegistration: PropTypes.func.isRequired,
}

export default AuthenticationModal;