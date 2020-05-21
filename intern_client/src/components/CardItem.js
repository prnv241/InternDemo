import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles, Typography, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
  root: {
    height: 140, 
    width:225,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: '0.6rem',
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
    fontSize: '0.8rem',
    marginLeft: 5,
    marginTop: 5
  },
  reqtime: {
    float: 'right',
    fontSize: '0.6rem', 
  }, 
  tick: {
    float: 'right',
  }
}

function CardItem(props) {
  const { data, type, classes, chap } = props;
  const back = type === 'Quiz' ? "transparent linear-gradient(54deg, #F792AB 0%, #FCE584 100%) 0% 0% no-repeat padding-box" : "white";
  let lnk; if(type==='Quiz'){ if(data.complited) {lnk= `/module/quizes/${data.ref}/result`} else { lnk= `/module/quizes/${chap}/${data.ref}` } } else if(type==='Video') { lnk = `/module/videos/${chap}/${data.ref}` } else { lnk = `/module/readings/${chap}/${data.ref}` }
  const Img = type === 'Quiz' ? "https://i.ibb.co/0X4q66w/icon-1-e3e2422cb1e874706a4564d4662e215a-2x.png" : "https://i.ibb.co/wsw3w49/Image-12-2x.png";
  return (
    <Grid item sm={3} >
      <Link to={lnk} style={{textDecoration: 'none'}}>
        <Card className={classes.root} style={{background: back}}>
          <CardContent className={classes.containt}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {type} <span className={classes.tick}>{ data.complited ? (<CheckCircleIcon style={{fill: '#00cc33', height:20, width:20}} />) : (<FiberManualRecordIcon style={{fill: '#f5f5f5'}}/>) }</span>
            </Typography>
            <img alt="logo" src={Img} className={classes.image} />
            <Typography className={classes.pos}>
              {data.name}
            </Typography>
            <Typography className={classes.reqtime} color="textSecondary">
              {data.time}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}

export default withStyles(styles)(CardItem);