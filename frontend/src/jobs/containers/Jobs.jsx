import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FacebookShareButton,FacebookIcon,
  TwitterShareButton, TwitterIcon } from 'react-share';
import GoogleMapReact from 'google-map-react';
import {
    Container, Tab, Col, Row, ListGroup, Card, Button, Form,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import SearchBox from '../../common/SearchBox';
import { fetchJobs } from '../../actions/jobsActionCreator';
import './jobs.css';
import MyGreatPlace from './my_great_place.jsx';

// const testJobs = [
//   {id:1,title:'Job1', description:'Hello world, Hello world,Hello world,Hello world,Hello world',location:'mtl', company:'google',salary:'100',jobtype:'fulltime'},
//   {id:2,title:'Job2', description:'QA',location:'france', company:'google',salary:'100',jobtype:'full time'},
//   {id:3,title:'Job3', description:'Ruler',location:'mtl', company:'google',salary:'100',jobtype:'part time'}];

class Jobs extends Component {
  state = {
    dataLoading: true,
    searchText: '',
    center: {
			lat: 45.5017,
			lng: -73.5673
		  },
      zoom: 11,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
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
            <Row>
              <Col md={1}>
            <FacebookShareButton
            url={"http://localhost:8080/#"+job.id}
            quote={job.title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
            </FacebookShareButton>
            </Col>
            <Col md={1}>
            <TwitterShareButton
            url={"http://localhost:8080/#"+job.id}
            quote={job.title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
            </TwitterShareButton>
            </Col>
            </Row>

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
          <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAJ6am3cGCf8oniMQF_w4zibYobuW-Ru3Y'  }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                >
                  <MyGreatPlace lat={45.504670} lng={-73.613162} text={'1'}  />
                  <MyGreatPlace lat={45.495157} lng={ -73.579549} text={'2'}  />
                  <MyGreatPlace lat={45.464823} lng={-73.740594} text={'3'}  />
                </GoogleMapReact>
              </div>
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