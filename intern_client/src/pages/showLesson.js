import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import JumboTitle from '../components/JumboTitle';
import { connect } from 'react-redux';
import { getLesson } from '../redux/actions/lessonActions';
import ChapterSlide from '../components/ChapterSlide';

const mapStateToProps = (state) => ({
  lessons: state.lessons,
})

const mapDispatchToProps = {
  getLesson, 
}

export class showLesson extends Component {
  componentDidMount() {
    this.props.getLesson(this.props.match.params.lessonId);
  }
  render() {
    const { lesson , loading } = this.props.lessons;

    let chaptersMarkup = !loading ? (
      <>
        <JumboTitle title={lesson.metadata.lessonName} />
        {lesson.chapters.map((chap) => 
          <ChapterSlide key={chap.chapNo} chap={chap} />
        )}
      </>
    ) : (
      <p>Loading...</p>
    );
    return (
      <>
        <Navbar />
        {chaptersMarkup}
        <p className="warning">(All lessons are pointing to same lesson for now)</p>
      </>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(showLesson)
