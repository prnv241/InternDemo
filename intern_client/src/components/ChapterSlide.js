import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import CardItem from '../components/CardItem';

const styles = {
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: '1rem'
  },
}

function ChapterSlide(props) {
  const { chap, classes } = props;
  return (
    <div>
      <div className="container">
        <Typography variant="body2" color="primary" className={classes.title}>
          <strong>{chap.chapName}</strong>
        </Typography>
        <Grid container>
          {chap.videos.map((vid,index) => <CardItem key={index} data={vid} type="Video"/>)}
          {chap.reading.map((read,index) => <CardItem key={index} data={read} type="Reading"/>)}
          {chap.quiz.map((que,index) => <CardItem key={index} data={que} type="Quiz"/>)}
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(ChapterSlide);
