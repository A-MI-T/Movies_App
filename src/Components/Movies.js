import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

    async componentDidMount(){
        //side effects - tasks which will take time are generally called here as it will not interrupt the UI loading and it don not look laggy.
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e588f3841c85efc61c2d3c73de95270b&language=en-US&page=${this.state.currPage}`)
        let data=res.data;
        // console.log(data); without using 'async' above it will not wait for data from get and will firstly change state(as below) without even getting data from API, and output will be undefined. 
        this.setState({
            movies:[...data.results]
        })
        // console.log('mounting done');
    }

    changeMovies=async()=>{ //change movies according to current page no. Request will be done acc. to page number
        console.log('changeMovies called');
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e588f3841c85efc61c2d3c73de95270b&language=en-US&page=${this.state.currPage}`)
        let data=res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies) //by this way 'changeMovies' work as a callback func. and is called only after change in 'currPage'
        }
    }

    handleRight=()=>{
        let tempArr=[]
        for(let i=1; i<=this.state.parr.length+1; i++){
            tempArr.push(i);
        }
        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }

    handleClick=(value)=>{
        if(value != this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourites=(movie)=>{//action of 'Add to favourites' button
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]");
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)  //removes the movie which is clicked, as it will filter all those movies whose id do not match. Since, id of the clicked movie can match, if matched then it will be not included in 'oldData' and remaining others are included. 
        }else{
            oldData.push(movie);
        }
        localStorage.setItem("movies",JSON.stringify(oldData))
        console.log(oldData);
        this.handleFavouriteState();
    }
    handleFavouriteState=()=>{
        let oldData= JSON.parse(localStorage.getItem('movies') || "[]");
        let temp= oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    render(){
        // let movie = movies.results
        // console.log('render');
        // console.log(movie.length)
        return(
        <>
        {
            this.state.movies.length ==0?
            <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            :
            <div>
                <h3 className="text-center"><strong>Trending</strong></h3>

                <div className='movies-list'>
                {
                    this.state.movies.map((movieObj)=>(
                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title}/>
                            {/* <div className="card-body"> */}
                            <h4 className="card-title movies-title">{movieObj.original_title}</h4>
                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                            <div className='button-wrapper' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                {
                                    this.state.hover == movieObj.id &&
                                    <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)? "Remove from favourites":"Add to favourites"}</a>
                                }
                            </div>
                            {/* </div> */}
                        </div>
                    ))
                }
                </div>

                <div style={{display:'flex', justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" onClick={this.handleLeft} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        this.state.parr.map((value)=>(
                        <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                    }
                    {/* <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                    <li className="page-item">
                        <a className="page-link" onClick={this.handleRight} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
                </nav>
                </div>
            </div>
        }
        </>
        )
    }
}
