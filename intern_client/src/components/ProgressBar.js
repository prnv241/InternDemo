import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = {
  outerdiv: {
    marginTop: 7,
    height: '10px',
    width : '100%',
    backgroundColor: 'rgba(255,255,255,0.4)' 
  },
  percentage: {
    fontSize: '0.85rem',
    color: 'white',
    textDecoration: 'bold',
    paddingTop: 0
  },
  innerdiv: {
    height: '100%',
    backgroundColor: 'white'
  }
}

function ProgressBar(props) {
  const { classes } = props;
  const percentage = Math.round((props.total/props.outoff) * 100).toString().concat('%');
  return (
    <div className="container row">
      <div className="col-md-9 pl-0" style={{}}>
        <div className={classes.outerdiv}>
          <div className={classes.innerdiv} style={{width: percentage}}></div>
        </div>
      </div>
      <div className="col-md-2">
        <strong className={classes.percentage}>
          {percentage}
        </strong>
      </div>
    </div>
  )
}

export default withStyles(styles)(ProgressBar);