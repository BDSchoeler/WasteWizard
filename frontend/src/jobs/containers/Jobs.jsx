import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container, Tab, Col, Row, ListGroup, Card, Button, Form,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import SearchBox from '../../common/SearchBox';
import { fetchJobs } from '../../actions/jobsActionCreator';
import './jobs.css';

// const testJobs = [
//   {id:1,title:'Job1', description:'Hello world, Hello world,Hello world,Hello world,Hello world',location:'mtl', company:'google',salary:'100',jobtype:'fulltime'},
//   {id:2,title:'Job2', description:'QA',location:'france', company:'google',salary:'100',jobtype:'full time'},
//   {id:3,title:'Job3', description:'Ruler',location:'mtl', company:'google',salary:'100',jobtype:'part time'}];

class Jobs extends Component {
  state = {
    dataLoading: true,
    searchText: ''
  }

	handleChange = (e) => {
		this.setState({
			searchText: e.target.value
		});
  }
  
	handleEnterPress = (e) => {
		if (e.key === 'Enter') {
			this.searchJobs();
		}
	}

  componentWillMount(){
    //fetch all jobs
    console.log('component will mount')
    this.props.actions.fetchJobs(this.props.auth.token,'').then(()=>{
      this.setState({
        dataLoading: false
      })
    });
  }

  buildJobList = () => {
    const jobList = this.props.jobs.list.map(job => (
      <ListGroup.Item action href={'#'+job.id}>
        {job.title}
      </ListGroup.Item>
    ));
    return jobList;
  }

  buildJobTabs = () => {
    const jobTabs = this.props.jobs.list.map(job => (
      <Tab.Pane eventKey={'#'+job.id}>
        <Card style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className='subtitle'>{job.company} - {job.location}</Card.Subtitle>
            <Card.Text>
              {job.description}
            </Card.Text>
            <Card.Subtitle className='subtitle-light'>Job Type: {job.jobtype}</Card.Subtitle>
            <Card.Subtitle className='subtitle-light'>Annual Salary: {job.salary}</Card.Subtitle>
            <Button variant="success">Apply Now</Button>
          </Card.Body>
        </Card>;
      </Tab.Pane>
    ));
    return jobTabs;
  }

  searchJobs = () => {
    this.props.actions.fetchJobs(this.state.searchText).then(() => {
      this.setState({
        searchText: ''
      });
    })
  }

	render() {
    console.log(this.props.jobs)
		return (
      <Container>
          <Row>
            <Col xs={8} md={10} className='search-box'>
              <Form.Control 
                type="text"
                placeholder='keywords, job titles, companies...'
                value={this.state.searchText}
                onChange={this.handleChange}
                onKeyPress={this.handleEnterPress}
              />
            </Col>
            <Col xs={4} md={2} className='search-box'>
              <Button variant="info" onClick={this.searchJobs}>
                Find Jobs
              </Button>
            </Col>
          </Row>
          { !this.state.dataLoading &&
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={12} md={12}>
                <h2> Jobs </h2>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <ListGroup>
                  {this.buildJobList()}
                </ListGroup>
              </Col>
              <Col md={7}>
                <Tab.Content>
                  {this.buildJobTabs()}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          }
      </Container>
		);
	}
}

Jobs.defaultProps = {
	auth: {
		authenticated: false,
		err: null,
	}
}
  
Jobs.propTypes = {
  auth: PropTypes.shape({}),
  jobs: PropTypes.shape({}),
	actions: PropTypes.shape({
    fetchJobs: PropTypes.func.isRequired,
	}).isRequired
}

export default connect(
  (state) => ({
    jobs : state.jobsReducer,
    auth: state.authReducer
  }),
  dispatch => ({
    actions: bindActionCreators({ 
			fetchJobs
		}, dispatch)
  })
)(Jobs);