import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container, Tab, Col, Row, ListGroup, Card, Button
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import SearchBox from '../../common/SearchBox';
import { fetchJobs } from '../../actions/jobsActionCreator';
import './jobs.css';

const testJobs = [
  {id:1,title:'Job1', description:'Hello world, Hello world,Hello world,Hello world,Hello world',location:'mtl', company:'google',salary:'100',jobtype:'fulltime'},
  {id:2,title:'Job2', description:'QA',location:'france', company:'google',salary:'100',jobtype:'full time'},
  {id:3,title:'Job3', description:'Ruler',location:'mtl', company:'google',salary:'100',jobtype:'part time'}];

class Jobs extends Component {
  state = {
    dataLoading: true
  }

  componentWillMount(){
    //fetch all jobs
    this.props.actions.fetchJobs(this.props.auth.token,'').then(()=>{
      this.setState({
        dataLoading: false
      })
    });
  }

  buildJobList = () => {
    // const { jobs } = this.props;
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
              {job.description + '\n'}
              random
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

	render() {
		return (
      <Container>
          <SearchBox />
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