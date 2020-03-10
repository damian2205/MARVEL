import React, {Component} from 'react';
import md5 from 'md5';
import Select from 'react-select';
require('../css/api.css');


export default class APIM extends Component{
  constructor(){
    super();
    this.state = {
      data: [],         //Estado de los personajes
      getSeries: [],         //Estado de series por personaje
      getImagen: [],
    }          
  }

  componentDidMount(){
      this.fetchMarvel();
      // this.imagenPersonajes();
  }

  // Llamado a personajes de la API de Marvel
  async fetchMarvel(){
    // // Consumo de API DE MARVEL
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';             // PrivateKey asignada por la pagina de Mavel

    // Encriptacion de keys
    const hash = md5(ts+privateKey+publicKey),
          URL = (`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`);

      /* EndPoint MARVEL, configuraciones necesarias para los llamados 
        HASH = 2fd6719e46e5238b2a411bc3e541eefd 
        ts = 1580325822661
        Public KEY = f97f541a27560153f37504b1f5078573  
        http://gateway.marvel.com/v1/public/characters?ts=1580325822661&apikey=f97f541a27560153f37504b1f5078573&hash=2fd6719e46e5238b2a411bc3e541eefd */
      // console.log(ts);
      // console.log(hash);
      // console.log(URL); */

      // API de los personajes de Marvel
      await fetch(URL)
        .then(res => res.json())
        .then(datos => {
          console.log("Personajes", datos);
          const i = datos.data.results.map(row =>{
            return {value: row.id, label: row.name, imagen: row.thumbnail.path+'/portrait_xlarge.jpg',}
          })
          this.setState({data: i});
          // console.log(this.state.data)
        })
        .catch(err => console.error("Ha ocurrido un error con los characters", err));  
  }
  // Llamado de series por personajes
  getSeries(i){
    console.log(i)
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey);
      var id = i.value;
      const series_char = (`http://gateway.marvel.com/v1/public/characters/${id}/series?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`);

            fetch(series_char)
              .then(res => res.json())
              .then(T =>{
                console.log(T)
                const r = T.data.results.map((res)=>{
                  return {value: res.id, label: res.title, imagen: res.thumbnail.path+'/portrait_xlarge.jpg', descripcion: res.description}
                })
                // console.log("Series por personaje", T.data.results)
                this.setState({getSeries: r})
              });
  }



      render(){
        // console.log("comics", this.state.fechas_comics);
        return(
          <>
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
          <center><h1> PERSONAJES DE MARVEL </h1></center>
            
          <section>
             <Select
              placeholder="Lista de personajes"
              onChange={i=>{
                this.getSeries(i)
                }}
              options={this.state.data}
              />
            <div>
              <h1> Series por personajes </h1>
                {this.state.getSeries.map((content) => {
                return <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card__">
                        <div className="card-header">
                                <center className="name"><h1><b>{content.label}</b></h1></center>
                            <div className="card-body">
                                <center><img src={content.imagen} alt="..."/></center>
                                <p>{content.descripcion}</p>
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