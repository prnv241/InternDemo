import React from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import CardItem from '../components/CardItem';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = {
  title: {
    paddingTop: 40,
    paddingBottom: 20,
    fontSize: '1rem'
  },
  Add: {
    float: 'right',
  }
}

function ChapterSlide(props) {
  const { chap, classes } = props;
  return (
    <div>
      <div className="container">
        <Typography variant="body2" color="primary" className={classes.title}>
          <strong>{chap.chapName}</strong>
          <span className={classes.Add}>
            <Link to={`/module/new/${chap.chapId}`} >
              <IconButton aria-label="delete">
                <AddIcon color="primary"/>
              </IconButton>
            </Link>
          </span>
        </Typography>
        <Grid container>
          {chap.videos.map((vid,index) => <CardItem key={index} data={vid} type="Video" chap={chap.chapId}/>)}
          {chap.reading.map((read,index) => <CardItem key={index} data={read} type="Reading" chap={chap.chapId}/>)}
          {chap.quiz.map((que,index) => <CardItem key={index} data={que} type="Quiz" chap={chap.chapId}/>)}
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(ChapterSlide);
