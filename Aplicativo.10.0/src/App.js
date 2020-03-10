import React, {Component} from 'react';
import Home from './api/home';
import '../src/css/app.css'


export default class App extends Component{
  render(){
  return(
    <>
    <div className="barra">
    <h1><i> API MARVEL </i></h1>
    </div>
    <div>
      <Home/>
    </div>
    </>
  )
}

}

