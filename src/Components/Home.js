import Banner from "./Banner";
import Movies from "./Movies";

import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <>
        <Banner/>
        <Movies/>
      </>
    )
  }
}
