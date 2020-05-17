import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import { Grid } from '@material-ui/core';
import LessonCard from '../components/LessonCard';
import { connect } from 'react-redux';
import { getLessonsInfo } from '../redux/actions/lessonActions';

const mapStateToProps = (state) => ({
  lessons: state.lessons
})

const mapDispatchToProps = {
  getLessonsInfo
}

class lessons extends Component {
  componentDidMount() {
    this.props.getLessonsInfo();
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
    let Lessons = this.props.lessons.lessons.map((lesson,index) => <LessonCard key={lesson.lessonId} lesson={lesson} back={colorGrads[index]}/>)
    return (
      <>
        <Navbar />
        <div className="container" style={{ marginTop: '6%'}}>
          <Grid container spacing={2}>
            { Lessons }
          </Grid>
        </div>
        <p className="warning">(All lessons are pointing to same lesson for now)</p>
      </>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(lessons)
