import React, { Component } from "react";
import md5 from 'md5';
import Select from 'react-select';
require('../css/api.css');


export default class Series extends Component{

    constructor(){
        super();
        this.state = {
          seriesM: [],           //Estado de las series
          char_series: [],        //Estado de personajes por series
          comic_series: [],       //Estado de comics por series
        }          
      }

      componentDidMount(){
          this.series();
      }
  //Llamado de series
  async series(){
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey);
    const seriesapi = (`http://gateway.marvel.com/v1/public/series?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`);

      await fetch(seriesapi)
        .then(res => res.json())
        .then(series_ => {
          const q = series_.data.results.map(row =>{
            return {value: row.id, label: row.title}
          })
          this.setState({seriesM: q});
        })
        .catch(err => console.error("Ha ocurrido un error con los series", err));
  }

  //Llamado de personajes por series
  async getCharSeries(o){
    console.log(o);
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey);
      var id = o.value;
      const char_series = (`http://gateway.marvel.com/v1/public/series/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`);

            await fetch(char_series)
              .then(res => res.json())
              .then(q =>{
                const i = q.data.results.map((res)=>{
                  return {value: res.id, label: res.name, imagen: res.thumbnail.path+'/portrait_xlarge.jpg', descripcion: res.description}
                })
                this.setState({char_series: i})
              });
  }

  //Llamado de comics por series
  async comicSeries(p){
    console.log(p);
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey);
      var id = p.value;
      const comicSeriess = (`http://gateway.marvel.com/v1/public/series/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`);

            await fetch(comicSeriess)
              .then(res => res.json())
              .then(r =>{
                console.log("char", r.data.results)
                const c = r.data.results.map((res)=>{
                  return {value: res.id, label: res.title, imagen: res.thumbnail.path+'/portrait_xlarge.jpg', descripcion: res.description}
                })
                this.setState({comic_series: c})
              });
  }

  render(){
    return(
      <>
      <center><h1> SERIES DE MARVEL </h1></center>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              MARVEL
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/heroes">Heroes</a>
              <a className="dropdown-item" href="/personajes">Personajes</a>
              <a className="dropdown-item" href="/comics">Comics</a>
              <a className="dropdown-item" href="/series">Series</a>
              <a className="dropdown-item" href="/fechas">Fechas</a>
            </div>
          </div>
      <section>
          <Select
          placeholder="Lista de series"
          onChange={o=>{
            this.getCharSeries(o)
          }}
          options={this.state.seriesM}
          />
          <Select
          placeholder="Lista de comics por series"
          onChange={p=>{
            this.comicSeries(p)
          }}
          options={this.state.seriesM}
          />
        <div>
          <h1> Personajes por series </h1>
          {this.state.char_series.map((res)=>{
            return <div className="row">
            <div className="col-md-4 mx-auto">
                <div className="card__">
                    <div className="card-header">
                            <center className="name"><h1><b>{res.label}</b></h1></center>
                        <div className="card-body">
                            <center><img src={res.imagen} alt="..."/></center>
                            <p>{res.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          })}
          <h1> Comics por series </h1>
          {this.state.comic_series.map((res)=>{
            // return <div><li>{res.label}</li><img src={res.imagen}/></div>
              return <div className="row">
              <div className="col-md-4 mx-auto">
                  <div className="card__">
                      <div className="card-header">
                              <center className="name"><h1><b>{res.label}</b></h1></center>
                          <div className="card-body">
                              <center><img src={res.imagen} alt="..."/></center>
                              <p>{res.descripcion}</p>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
          })}
        </div>
      </section>
      </>
    )
  }
}