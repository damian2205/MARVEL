import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import Home from '../api/home.js';
import Login from '../users/Login';
import Registro from '../users/Registro';
import BLogin from '../components/bLogin';
import BRegistro from '../components/bRegistro';
import Personajes from '../api/personajes';
import Comics from '../api/comics';
import Series from '../api/series.js';
import Fechas from '../api/fechas';
// import LISTAS from '../components/listas';
import HERO from '../components/heroes';
import Favoritos from '../components/favoritos';
import APP from '../App';
import Home from '../api/home';

// import '../src/css/app.css'


export default class App extends Component{
  render(){
  return(
    <>
    <div className="barra">
    <h1><i> API MARVEL </i></h1>
    </div>
    <section>
        <Router>
            <Link to="/"></Link>
            <Link to="/login"><BLogin/></Link>
            <Link to="/registro"><BRegistro/></Link>
            <Link to="/personajes"></Link>
            <Link to="/heroes"></Link>
            <Link to="/comics"></Link>
            <Link to="/series"></Link>
            <Link to="/fechas"></Link>
            <Link to="/redux"></Link>
            <Switch>
            <Route exact path="/"><Home/></Route>

            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/registro">
                <Registro/>
            </Route>
            <Route path="/heroes">
              {/* <LISTAS/> */}
              <HERO/>
              <Favoritos/>
            </Route>
            <Route path="/personajes">
                <Personajes/>
            </Route>
            <Route path="/comics">
              <Comics/>
            </Route>
            <Route path="/series">
              <Series/>
            </Route>
            <Route path="/fechas">
                <Fechas/>
            </Route>
            {/* <Route path="/redux">
            </Route> */}
              </Switch> 
        </Router>   
    </section>
    </>
  )
}

}

