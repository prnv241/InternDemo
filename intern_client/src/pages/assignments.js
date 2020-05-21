import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAssgnInfo } from '../redux/actions/assgnActions';
import LessonCard from '../components/LessonCard';
import Loading from '../components/Loading';

const mapStateToProps = (state) => ({
  assignments: state.assignments
})

const mapDispatchToProps = {
  getAssgnInfo,
}

class lessons extends Component {

  componentDidMount() {
    this.props.getAssgnInfo();
  }

  calculate = (dueDate) => {
    var date_now = Date.now();
    var date_future = dueDate;
    var delta = Math.abs(date_future - date_now) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    return {
      days: days,
      hours: hours,
      minutes: minutes
    }
  }
  render() {
    let colorGrads = [ 
      "transparent linear-gradient(125deg, #1D976C 0%, #9DD138 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #2375D3 0%, #3BA9FE 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #F03748 0%, #F78179 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #20C7C3 0%, #58F4EF 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #A36CFC 0%, #DAACE0 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #F791AB 0%, #FCE484 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #FF6200 0%, #FD9346 100%) 0% 0% no-repeat padding-box",
      "transparent linear-gradient(125deg, #2375D3 0%, #67D0E8 100%) 0% 0% no-repeat padding-box"
    ]
    let Assignments = this.props.assignments.loading.aloading ? (<Loading />) : (this.props.assignments.assignments.map((assign,index) => <LessonCard key={assign.lessonId} lesson={assign} back={colorGrads[index]} times={this.calculate(assign.dueDate)}/>));
    return (
      <>
        <Navbar />
        <div className="container" style={{ marginTop: '6%'}}>
          <Grid container spacing={2}>
            { Assignments }
          </Grid>
        </div>
        <p className="warning">(Due time updates on reload)</p>
      </>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(lessons);
