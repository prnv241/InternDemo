import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, Typography, Grid, Button } from '@material-ui/core';
const { v4: uuid } = require('uuid');

const styles = {
  card: {
    padding: 0
  },
  title: {
    fontSize: '1.2rem',
    marginTop: 20,
    marginLeft: 20
  },
  font: {
    fontSize: '1rem',
    paddingLeft: 20
  },
  option: {
    border: '1px solid grey',
    width: '80%',
    margin: 10,
    padding: 10,
  },
  grid: {
    marginLeft: 40
  },
  root: {
    borderRadius: 10
  }
}

function QuizCard(props) {
  var handleClick = (ansObj) => {
    var a = document.getElementById(uniqueIds[0]);
    var b = document.getElementById(uniqueIds[1]);
    var c = document.getElementById(uniqueIds[2]);
    var d = document.getElementById(uniqueIds[3]);

    a.style.border= "1px solid grey"
    b.style.border= "1px solid grey"
    c.style.border= "1px solid grey"
    d.style.border= "1px solid grey"

    let id = ansObj.uid;
    let x = document.getElementById(id);
    x.style.border= "2px solid #3f51b5";
    setans(ansObj.id, ansObj.ans);
  }
  const { classes, question, setans } = props;
  const uniqueIds = [ uuid(), uuid(), uuid(), uuid()];
  return (
    <div className="container">
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.card}>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            Q{question.id + 1}. {question.question}
          </Typography>
          <Grid container className={classes.grid}>
            <Grid item md={6}>
              <Button className={classes.option} id={uniqueIds[0]} onClick={() => handleClick({id: question.id, ans: question.options[0], uid: uniqueIds[0]})}>
                <Typography className={classes.font}>
                  A. {question.options[0]}
                </Typography>
              </Button>
              <Button className={classes.option} id={uniqueIds[1]} onClick={() => handleClick({id: question.id, ans: question.options[1], uid: uniqueIds[1]})}>
                <Typography className={classes.font}>
                  B. {question.options[1]}
                </Typography>
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button className={classes.option} id={uniqueIds[2]} onClick={() => handleClick({id: question.id, ans: question.options[2], uid: uniqueIds[2]})}>
                <Typography className={classes.font}>
                  C. {question.options[2]}
                </Typography>
              </Button>
              <Button className={classes.option} id={uniqueIds[3]} onClick={() => handleClick({id: question.id, ans: question.options[3], uid: uniqueIds[3]})}>
                <Typography className={classes.font}>
                  D. {question.options[3]}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <p></p>
    </div>
  )
}

export default withStyles(styles)(QuizCard);
