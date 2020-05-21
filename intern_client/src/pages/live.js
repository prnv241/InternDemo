import React, { Component } from 'react'
import Navbar from "../components/Navbar";

class live extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <p className="warning">(Live streaming feature can be implimented in future)</p>
        </div>
      </>
    )
  }
}

export default live
