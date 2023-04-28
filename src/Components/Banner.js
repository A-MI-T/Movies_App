import { movies } from './getMovies'
import React, { Component } from 'react'

export default class Banner extends Component {
  render() {
    let movie = movies.results[0]  //we need only first object of the array to make the banner
    // let movie=''
    return (
        <>{
            movie == ''?
            <div className="card" aria-hidden="true" style={{width:'18rem'}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
            </p>
            <a className="btn btn-primary disabled placeholder col-6"></a>
            </div>
            </div>
            :
            <div className="card banner-card">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title}/>
            {/* <div className="card-body"> */}
            <h2 className="card-title banner-title">{movie.original_title}</h2>
            <p className="card-text banner-text">{movie.overview}</p>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            {/* </div> */}
            </div>
        }</>
    )
  }
}