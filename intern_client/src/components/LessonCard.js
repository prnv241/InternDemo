import React from 'react'
import { Grid, Typography} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import ProgressBar from '../components/ProgressBar';
import { Link } from 'react-router-dom';

const styles = {
  cardstyles: {
    height: 140, 
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
  }
}


function LessonCard(props) {
  const { classes } = props;
  let link = `/lessons/${props.lesson.lessonId}`;
  return (
    <Grid item sm className="mt-4">
      <Link to={link} style={{textDecoration: 'none'}} >
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
        </div>
      </Link>
    </Grid>
  )
}

export default withStyles(styles)(LessonCard);