import React, {Component} from 'react';
import md5 from 'md5';
// import Select from 'react-select';
require('../css/api.css');

export default class fechas extends Component{

    constructor(){
        super();
        this.state = {
          dataComic: [],        //Estado de los comics
          fechas_comics: [],    //Estado de fechas de comics por salir 
        }          
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.comicsMarvel = this.comicsMarvel.bind(this);    
      }

      componentDidMount(){
          this.comicsMarvel();
    }

// Llamado de api para los comics
comicsMarvel(){
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey),
          URL1 = (`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`);

      fetch(URL1)
        .then(res => res.json())
        .then(Mcomic => {
        //   console.log("datess", Mcomic);
          const i = Mcomic.data.results.map(row =>{
            return {value: row.id, label: row.title, dates: row.dates.date, imagen: row.thumbnail.path+'/portrait_xlarge.jpg', descripcion: row.description}
          })
            
          // const q = Mcomic.data.results.map(list =>{
          //   return list.dates.map((ok)=>{
          //     return {fechas: ok.date, type: ok.type}
          //   })
          // })
          // const q = Mcomic.data.results.map(list =>{
          //   if( list.dates.map() > Date.now()){
          //     return {fechas: list.date, type: list.type}
          //   }
          // })

          this.setState({dataComic: i});
          // this.setState({fechas_comics: q});
        })
        .catch(err => console.error("Ha ocurrido un error con los comics", err));
      }

  // Llamado de personajes por cada comic
  getCharComics(e){
    console.log(e)
      var fechas = e.dates;
        this.setState({fechas_comics: fechas});
        if(this.state.fechas_comics.date > Date.now()){
          return this.state.fechas_comics
        }
      console.log("Fechas", fechas);
  }

  render(){
    if(this.state.fechas_comics.dates > Date.now()){
      const r = this.state.dataComic.dates
      console.log(r)
    }
    return(
      <>
      <center><h1> FECHAS DE SALIDA DE COMICS </h1></center>
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
          <div>
            {this.state.fechas_comics.map((ok)=>{
              return <div className="row">
              <div className="col-md-4 mx-auto">
                  <div className="card__">
                      <div className="card-header">
                              <center className="name"><h1><b>{ok.date}</b></h1></center>
                          <div className="card-body">
                              <center><img src={ok.imagen} alt="..."/></center>
                              <p>{ok.descripcion}</p>
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