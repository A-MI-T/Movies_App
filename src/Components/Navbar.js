import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex', background:'rgb(96 164 192', padding:'0.5rem'}}>
        <Link to="/" style={{textDecoration:'none', color:'black'}}><h1 style={{marginTop:'0.5rem', marginLeft:'1rem'}}> Movies </h1></Link>
        <Link to="/favourites" style={{textDecoration:'none', color:'black'}}><h4 style={{marginLeft:'2rem', marginTop:'1.25rem'}}>Favourites</h4></Link>
      </div>
    )
  }
}
