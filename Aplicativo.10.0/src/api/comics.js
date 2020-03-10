import React, {Component} from 'react';
import md5 from 'md5';
import Select from 'react-select';
require('../css/api.css');

export default class comics extends Component{

    constructor(){
        super();
        this.state = {
          dataComic: [],        //Estado de los comics
          getComics: [],        //Estado de los characters de los comics
          fechas_comics: [],    //Estado de fechas de comics por salir 
        }          
    
        this.componentDidMount = this.componentDidMount.bind(this);
        this.comicsMarvel = this.comicsMarvel.bind(this);    
      }

      componentDidMount(){
          this.comicsMarvel();
    }

// Llamado de api para los comics
async comicsMarvel(){
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel
      
    const hash = md5(ts+privateKey+publicKey),
          URL1 = (`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`);

      await fetch(URL1)
        .then(res => res.json())
        .then(Mcomic => {
          // console.log("datess", Mcomic);
          const i = Mcomic.data.results.map(row =>{
            return {value: row.id, label: row.title, dates: row.dates}
          })
          // const q = Mcomic.data.results.map(list =>{
          //   return list.dates.map((ok)=>{
          //     return {fechas: ok.date, type: ok.type}
          //   })
          // })
          this.setState({dataComic: i});
          // this.setState({fechas_comics: q});
        })
        .catch(err => console.error("Ha ocurrido un error con los comics", err));
      }

  // Llamado de personajes por cada comic
  async getCharComics(e){
    console.log(e)
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';              // PrivateKey asignada por la pagina de Mavel

    const hash = md5(ts+privateKey+publicKey);
      var id = e.value;
      var fechas = e.dates;
      console.log("Fechas", fechas);
      const comic_char = (`http://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`);

      await fetch(comic_char)
        .then(res => res.json())
        .then(getChar =>{
          const c = getChar.data.results.map((res)=>{
            return {value: res.id, label: res.name, imagen: res.thumbnail.path+'/portrait_xlarge.jpg', descripcion: res.description}
          })
          this.setState({getComics: c});
          this.setState({fechas_comics: fechas});
        });
  }

  render(){
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
      <center><h1> COMICS DE MARVEL </h1></center>
        
      <section>
      <Select
          placeholder="Lista de comics"
          onChange={e=>{
            this.getCharComics(e)
          }}
          options={this.state.dataComic}
        />
        
          <div>
            
            <h1> Personajes por comics </h1>
            {this.state.getComics.map((res)=>{
            // this.state.fechas_comics.map((ok)=>{
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
            // })
            })}
            {/* <h4> Fechas de salida </h4>
            {this.state.fechas_comics.map((ok)=>{
              return <ul><li>{ok.date}</li></ul>
            })} */}
            </div>
      </section>
        
      </>
    )
  }


}