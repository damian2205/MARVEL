import React, {Component} from 'react';
import md5 from 'md5';
require('../css/api.css');


class heroes extends Component{
  constructor(){
    super();
    this.state = {
      data: [],         //Estado de los personajes
      heroes: [],       //Estado para agregar heroes a favoritos 
    }          

    this.Marvel = this.Marvel.bind(this);
  }

  componentDidMount(){
      this.Marvel();
      
      // this.imagenPersonajes();
  }

  // Llamado a personajes de la API de Marvel
  async marvel(){
    // // Consumo de API DE MARVEL
    var ts = Date.now();   // Dato de la fecha.
    const privateKey = 'b05d8a26db8acc6f48d50c93824ff00a19c5cb61',     // PrivateKey asignada por la pagina de Mavel
          publicKey = 'f97f541a27560153f37504b1f5078573';             // PrivateKey asignada por la pagina de Mavel

    // Encriptacion de keys
    const hash = md5(ts+privateKey+publicKey),
          URL = (`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=5`);

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
          const i = datos.data.results.map(row =>{
            return {value: row.id, label: row.name, imagen: row.thumbnail.path+'/portrait_xlarge.jpg', descripcion: row.description}
          })
          this.setState({data: i});
          // console.log(this.state.data)
        })
        .catch(err => console.error("Ha ocurrido un error con los characters", err));  
  }

  cosas(i){
    console.log(i.value);
  }

  handleChange(e){
    this.setState({
      [heroes] : e.target.value})
    console.log("HEORE", this.state.heroes)
  }

  handleSubmit(e){
    e.preventdefault();
  }

  addHero(){
    alert("HEYYY");
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
              
          <center><h1><b> Heroes de Marvel </b></h1></center>
          <section>
          <div className="fav">
               {this.state.heroes.map((ok)=>{
                  return <div className="row" onSubmit={this.handleSubmit}>
                    <div className="col-md-4 mx-auto">
                        <div className="card__">
                            <div className="card-header">
                                    <center className="name"><h1><b>{ok.label}</b></h1></center>
                                <div className="card-body">
                                    <center><button value="Submit" onClick={this.handleSubmit}><img src="" alt="..."/></button></center>
                                    <p>{}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                })}
          </div>
          <div className="list">
               {this.state.data.map((ok)=>{
                  return <div className="row" onChange={this.handleChange}>
                    <div className="col-md-4 mx-auto">
                        <div className="card_1" onClick={this.addHero}>
                            <div className="card-header">
                                    <center className="name"><h1><b>{ok.label}</b></h1></center>
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

// export default connect(mapStateToProps, mapDispatchToProps)(heroes);
export default heroes;

