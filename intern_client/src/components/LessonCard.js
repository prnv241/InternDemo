import React from 'react'
import { Grid, Typography} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import ProgressBar from '../components/ProgressBar';
import { Link } from 'react-router-dom';

const styles = {
  cardstyles: {
    height: 'auto', 
    width:225,
    borderRadius:20
  },
  heading: {
    paddingTop: 20,
    paddingLeft: 20,
    textDecoration: 'bold',
    fontSize: '1.1rem',
    color: 'white'
  },
  subtitle: {
    fontSize: '0.6rem',
    paddingLeft: 20,
    paddingTop: 10,
    color: 'white'
  },
  progbar: {
    paddingLeft:20,
    paddingTop: 20,
  },
  timerem: {
    paddingLeft: 20,
    paddingBottom: 20,
    color: 'white'
  },
  timeHead: {
    fontSize: '0.7rem'
  }, maintime: {
    marginTop: '5px',
    marginLeft: '20px',
    marginRight: '20px',
    fontSize: '1.4rem'
  },
  maincap: {
    marginBottom: '5px',
    marginLeft: '18px',
    marginRight: '18px',
    fontSize: '0.6rem'
  }
}


function LessonCard(props) {
  const { classes, times } = props;
  let bott = props.lesson.complited ? (
    <div className={classes.timerem}>
      <Typography className={classes.timeHead}>Great Job!</Typography>
    </div>
  ) : null;
  let lnk = times !== undefined ? `/assignments/${props.lesson.assgnId}` : `/lessons/pNwhvMyzhyfAgkoe1HhD`;
  return (
    <Grid item sm className="mt-4">
      <Link to={lnk} style={{textDecoration: 'none'}} >
        <div className={classes.cardstyles} style={{background: props.back}}>
          <Typography variant="body2" className={classes.heading}>
            {props.lesson.lessonName}
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            {props.lesson.chaptersCount} Chapters {props.lesson.videosCount} Videos {props.lesson.readingsCount} Readings {props.lesson.quizesCount} Quizes
          </Typography>
          <div className={classes.progbar}>
            <ProgressBar total={props.lesson.complitedCount} outoff={props.lesson.videosCount + props.lesson.readingsCount + props.lesson.quizesCount}/>
          </div>
          { !props.lesson.complited && times !== undefined ? (
            <div className={classes.timerem}>
              <hr style={{margin: '8px'}}/>
              <Typography className={classes.timeHead}>
                Time to work!
              </Typography>
              <Typography className={classes.timeStamps}>
                <span className={classes.maintime}><strong>{times.days}</strong></span>
                <span className={classes.maintime}><strong>{times.hours}</strong></span>
                <span className={classes.maintime}><strong>{times.minutes}</strong></span>
              </Typography>
              <Typography className={classes.timeStamps}>
                <span className={classes.maincap}>days</span>
                <span className={classes.maincap}>hours</span>
                <span className={classes.maincap}>minutes</span>
              </Typography>
            </div>
          ) : (
            <>
              <br />
              {bott}
            </>
          )}
        </div>
      </Link>
    </Grid>
  )
}

export default withStyles(styles)(LessonCard);