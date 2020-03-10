import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as heroes from '../actions/action_heroes'
import initialState from '../reducer/initialState';

 const MENSAJE = (props) => {
  
    useEffect(() => {
       console.log(props)
      }, []);

     return(
<section>
        <h1><b> HOLA ESTA ES LA PRUEBA DE LAS ACTIONS </b></h1>
        <div className="contenedor-heroes">
        {/* {
        heroes.map( ok =>(
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card_1">
                            <div className="card-header">
                                    <center className="heroe"><h1><b>{ok.label}</b></h1></center>
                                <div className="card-body">
                                    <center><img src={ok.imagen} alt="..."/></center>
                                    <p>{ok.descripcion}</p>
                                </div>
                                <button onClick={()=> agregarFavorito(ok)}> FAVORITO </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }  */}
        </div>
    </section>
     )
    }

    const mapStateToProps = (state = initialState.datas) => ({
        heroes: state
    });


function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(heroes.charContent(), dispatch)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MENSAJE);