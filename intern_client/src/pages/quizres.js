import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import { Card, CardContent, Typography, Grid, CardActions, Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { getResult } from '../redux/actions/lessonActions';
import { MODULE_LOADING } from '../redux/types';

const styles = {
  contain: {
    padding: 0
  },
  box: {
    marginTop: '10vh',
    marginBottom: '10vh',
    height: '60vh',
    weidth: '80%'
  },
  upper: {
    paddingTop: 30,
    paddingLeft: 30
  },
  middle: {
    backgroundColor: '#EEF3FF',
    height: '40%',
    minWidth: '100%',
    textAlign: 'right',
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 30,
    marginBottom: 30,
    paddingRight: 40
  },
  text: {
    margin: 5,
    fontSize: '1.2rem'
  },
  total: {
    fontSize: '1.5rem'
  },
  per: {
    float:'right',
    paddingRight: 40,
    fontSize: '2rem'
  },
  butt: {
    float: 'right',
    paddingRight: 40
  }
}

export class quizres extends Component {
  componentDidMount() {
    this.props.getResult(this.props.match.params.ref);
  }
  render() {
    const { classes, result: { noques, nocurr, nosub, percent }, ploading} = this.props;
    console.log(ploading);
    return (
      <>
      { ploading ? (<p>MODULE_LOADING...</p>) : (
        <div>
        <Navbar />
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid item md={6}>
            <Card className={classes.box}>
              <CardContent className={classes.contain}>
                <div className={classes.upper}>
                  <Typography style={{fontSize: '1.2rem'}}><strong>Practice Test Complited</strong><p style={{color: 'blue'}} className={classes.per}>{percent.toString() + '%'}</p></Typography>
                  <Typography>Congratulations! You have scored {percent.toString() + '%'} in this test</Typography>
                </div>
                <div className={classes.middle}>
                  <Typography className={classes.text}>No of Questions -    {noques}</Typography>
                  <Typography className={classes.text}>Questions Attempted -    {nosub}</Typography>
                  <Typography className={classes.text}>Answers Correct -    {nocurr}</Typography>
                  <br />
                  <Typography className={classes.total}>Total Score :    {nocurr} / {noques}</Typography>
                </div>  
              </CardContent>
              <CardActions className={classes.butt}>
                <Button variant="contained" color="primary" style={{marginRight: 20}}>Check Answers</Button> 
                <Button variant="contained" component={Link} to="/lessons" color="secondary">Go Back</Button> 
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid> 
      </div>
      )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  result: state.lessons.result,
  ploading: state.lessons.ploading
})

const mapDispatchToProps = {
  getResult
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(quizres))
