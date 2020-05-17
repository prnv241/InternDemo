import React from 'react'
import { withStyles, Typography } from '@material-ui/core'

const styles = {
  outerdiv: {
    width: '100%',
    background: 'url(https://i.ibb.co/x2mrpKh/FEF.png)',
    height: '30vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  title: {
    fontSize: '2.5rem',
    paddingTop: '70px',
    paddingLeft: '100px'
  }
}

function JumboTitle(props) {
  const { classes } = props;
  return (
    <div className={classes.outerdiv}>
      <Typography variant="h4" className={classes.title}>
        {props.title}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(JumboTitle);