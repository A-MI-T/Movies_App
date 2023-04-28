import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import Home from './Components/Home';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <Movies {...props}/>
            </>
        )}/> */}
        {/* <Route path='/' exact element={<Home/>}/> */}
        <Route path="/" element={[<Banner/>,<Movies/>]} />
        <Route path='/favourites' element={<Favourite/>}/>
      </Routes>
      {/* <Banner/> */}
      {/* <Movies/> */}
      {/* <Favourite/> */}
    </Router>
  );
}

export default App;
