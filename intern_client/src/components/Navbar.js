import React from 'react'
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
  return (
    <>
    <AppBar color="inherit" id="navbar-primary">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Demo Application
        </Typography>
        <div className="ml-auto">
          <Button color="inherit" className="mr-3 border" component={NavLink} to="/login" style={{textTransform: 'none'}}>
            Logout
          </Button>
          <Button color="inherit" className="mr-3 border" component={NavLink} to="/login" style={{textTransform: 'none'}}>
            Select Class
          </Button>
        </div>
      </Toolbar>
    </AppBar>
    <AppBar color="primary" id="navbar-secondary">
    <Toolbar id="toolbar-secondary">
      <NavLink activeClassName="active-link" className="mr-4 ml-5 navbar-items" to="/lessons">
        <Typography variant="subtitle1" noWrap>
          Lessons
        </Typography>
      </NavLink>
      <NavLink activeClassName="active-link" className="mr-4 navbar-items" to="/assignments">
        <Typography variant="subtitle1" noWrap>
          Assignments
        </Typography>
      </NavLink>
      <NavLink activeClassName="active-link" className="mr-4 navbar-items" to="/live">
        <Typography variant="subtitle1" noWrap>
          Live Streams
        </Typography>
      </NavLink>
    </Toolbar>
  </AppBar>
  </>
  )
}
