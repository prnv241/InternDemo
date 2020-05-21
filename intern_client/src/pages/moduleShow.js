import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import { Grid, Typography, Button } from '@material-ui/core';
import ChapterSlide from '../components/ChapterSlide';
import { getModule, markRead } from '../redux/actions/lessonActions';
import withStyles from '@material-ui/core/styles/withStyles';
import QuizModule from '../components/QuizModule';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const styles = {
  mediabox: {
    marginTop: 30,
    height: '55vh',
    width: '100%',
    backgroundColor: 'black'
  },
  infobox: {
    marginTop: 30,
  },
  title: {
    fontSize: '1.8rem'
  },
  button: {
    float: 'right',
    textDecoration: 'none'
  },
  lack: {
    marginTop: 30
  },
  frame: {
    height: '100%',
    width: '100%'
  }
}

export class moduleShow extends Component {

  componentDidUpdate(prevProps) {
    let type = this.props.match.params.type;
    let chapId = this.props.match.params.chapId;
    let ref = this.props.match.params.ref;
    if (ref !== prevProps.match.params.ref) {
      this.props.getModule(type,chapId,ref);
    }
  }

  componentDidMount() {
    let type = this.props.match.params.type;
    let chapId = this.props.match.params.chapId;
    let ref = this.props.match.params.ref;
    this.props.getModule(type,chapId,ref);
  }
  handleRead = () => {
    let type = this.props.match.params.type;
    let chapId = this.props.match.params.chapId;
    let ref = this.props.match.params.ref;
    this.props.markRead(type,chapId,ref);
  }
  render() {
    const { classes } = this.props;
    const { module, mloading } = this.props.lessons; 
    let moduleMarkup = mloading ? (
      <p>Loading...</p>
    ) : this.props.match.params.type === 'quizes' ? (
      <QuizModule module={module} />
    ) : (
      <div className="container">
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <div className={classes.mediabox}>
              <iframe className={classes.frame} src={module.data.url}>
                Content not Suppoted by your browser!
              </iframe>
            </div>
          </Grid>
          <Grid item sm={12} md={4}>
            <div className={classes.infobox}>
              <Typography variant="subtitle1" color="primary">
                {module.chapter.chapName}
              </Typography>
              <Typography className={classes.title}>
                {module.data.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {module.data.desc}
              </Typography>
              <div className={classes.lack}>
                <Typography variant="body2">
                  {module.data.time}
                </Typography>
                { module.data.complited ? (<span className={classes.button}>Completed <CheckCircleIcon style={{fill: '#00cc33', height:20, width:20}} /></span>) : (<Button variant="contained" color="primary" className={classes.button} onClick={this.handleRead}>Mark as Complete</Button>)}
              </div>
            </div>
          </Grid>
        </Grid>
        <ChapterSlide chap={module.chapter} />
      </div> 
    );
    return (
      <>
        <Navbar/>
        <div>
          {moduleMarkup}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessons
})

const mapDispatchToProps = {
  getModule, markRead
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(moduleShow))
