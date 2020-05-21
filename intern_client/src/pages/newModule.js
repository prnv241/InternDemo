import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import withStyles from '@material-ui/core/styles/withStyles'
import { Typography, TextField, Button, IconButton } from '@material-ui/core'
import { uploadFile, addModule, setDefault } from '../redux/actions/lessonActions';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircle from '@material-ui/icons/CheckCircle'

const styles = {
  contain: {
    width: '30vw',
    textAlign: 'center'
  },
  outer: {
    marginLeft: '20vw'
  },
  TextField: {
    display: 'block',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  or: {
    marginTop: 20,
    fontSize: '1.2rem'
  },
  title: {
    fontSize: '2.2rem',
    marginTop: 40,
    marginLeft: '5vw'
  },
  button: {
    marginTop: 20
  }
}
export class newModule extends Component {
  state = {
    desc: '',
    name: '',
    time: '',
    url: ''
  }
  handleEditFile = () => {
    const fileInput = document.getElementById("FileInput");
    fileInput.click();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = () => {
    const vidData = {
      desc: this.state.desc,
      name: this.state.name,
      time: this.state.time,
      url: this.state.url
    }
    const chapId = this.props.match.params.chapId;
    this.props.addModule(vidData, chapId); 
  }
  handleUpload = (event) => {
    if(event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("video", file, file.name);
      this.props.uploadFile(formData);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.lessons.url !== prevProps.lessons.url) {
      this.setState({
        url: this.props.lessons.url
      })
    }
  }
  render() {
    const { classes, lessons: {upload} } = this.props;
    if(upload === false) {
      this.props.setDefault();
      this.props.history.goBack();
    }
    return (
      <>
        <Navbar />
        <div className="container">
          <div className={classes.outer}>
            <Typography className={classes.title} color="textPrimary">
              Add a new module
            </Typography>
            <form noValidate className={classes.contain}>
              <TextField name="name" type="text" placeholder="Name of the video" label="Name" className={classes.TextField} value={this.state.name} onChange={this.handleChange} fullWidth/>
              <TextField name="time" type="text" placeholder="Required time to complete" label="Time" className={classes.TextField} value={this.state.time} onChange={this.handleChange} fullWidth/>
              <TextField name="desc" type="text" placeholder="Description of the video" label="Description" className={classes.TextField} multiline rows={4} value={this.state.desc} onChange={this.handleChange} fullWidth/>
              <TextField name="url" type="text" placeholder="Youtube link of the video" label="Link" className={classes.TextField} value={this.state.url} onChange={this.handleChange} fullWidth/>
              <Typography variant="h6" className={classes.or}> OR </Typography>
              <Typography className={classes.imgtext}>
                Upload a video 
                <input type="file" id="FileInput" hidden="hidden" onChange={this.handleUpload} />
                <IconButton onClick={this.handleEditFile} aria-label="delete">
                  <AddIcon color="primary"/>
                  {this.state.url !== '' ? <CheckCircle style={{fill: '#00cc33'}}/> : null}
                </IconButton>
              </Typography>
              <Button variant="contained" color="primary" disabled={upload} className={classes.button} onClick={this.handleSubmit}>{upload ? (<CircularProgress size="1.6rem" />) : <span>Submit</span>}</Button>
              <p style={{color: 'red', textAlign: 'center', paddingTop: '40', fontSize: '0.8rem'}}>(Use small sized mp4/avi clips)</p>
            </form>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessons
})

const mapDispatchToProps = {
  uploadFile, addModule, setDefault
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(newModule))
