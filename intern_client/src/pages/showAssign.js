import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import JumboTitle from '../components/JumboTitle';
import { connect } from 'react-redux';
import { getAssgn } from '../redux/actions/assgnActions';
import ChapterSlide from '../components/ChapterSlide';
import Loading from '../components/Loading';

const mapStateToProps = (state) => ({
  assignments: state.assignments,
})

const mapDispatchToProps = {
  getAssgn, 
}

export class showAssign extends Component {
  componentDidMount() {
    this.props.getAssgn(this.props.match.params.assgnId);
  }
  render() {
    const { assignment , loading: { ploading } } = this.props.assignments;

    let chaptersMarkup = !ploading ? (
      <>
        <JumboTitle title={assignment.metadata.lessonName} />
        {assignment.chapters.map((chap) => 
          <ChapterSlide key={chap.chapNo} chap={chap} />
        )}
      </>
    ) : (
      <Loading />
    );
    return (
      <>
        <Navbar />
        {chaptersMarkup}
        <p className="warning">(This is exactly same as lessons)</p>
      </>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(showAssign)
