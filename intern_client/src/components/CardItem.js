import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles, Typography, Card, CardContent } from '@material-ui/core';

const styles = {
  root: {
    height: 140, 
    width:225,
    borderRadius: 5
  },
  title: {
    fontSize: '0.8rem',
    paddingLeft: 5,
    marginBottom: 0
  },
  containt: {
    padding: 10,
  },
  image: {
    marginLeft: '22%',
    height: 70,
    width: 110
  },
  pos: {
    fontSize: '0.8rem'
  },
  reqtime: {
    float: 'right',
    fontSize: '0.6rem',
    
  }
}

function CardItem(props) {
  const { data, type, classes } = props;
  const back = type === 'Quiz' ? "transparent linear-gradient(54deg, #F792AB 0%, #FCE584 100%) 0% 0% no-repeat padding-box" : "white";
  const Img = type === 'Quiz' ? "https://i.ibb.co/0X4q66w/icon-1-e3e2422cb1e874706a4564d4662e215a-2x.png" : "https://i.ibb.co/wsw3w49/Image-12-2x.png";
  return (
    <Grid item sm={3} >
      <Card className={classes.root} style={{background: back}}>
        <CardContent className={classes.containt}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {type}
          </Typography>
          <img src={Img} className={classes.image} />
          <Typography className={classes.pos}>
            {data.name}
          </Typography>
          <Typography className={classes.reqtime}>
            {data.time}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(CardItem);