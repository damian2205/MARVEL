import React, {useEffect}from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as fav from '../actions/actionFavoritos';
import initialState from '../reducer/initialState';

const Favoritos = (props) => {
    useEffect(() => {
        console.log(props)
       }, []);

       return(
    <section>
        <h1> Favoritos </h1>
        <hr/>
        <div className="favoritos">
        {/* {
        favoritos.map( ok =>(
                  <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card_1">
                            <div className="card-header">
                                    <center className="name"><h1><b>{ok.label}</b></h1></center>
                                <div className="card-body">
                                    <center><img src={ok.imagen} alt="..."/></center>
                                    <p>{ok.descripcion}</p>
                                    <button onClick={()=> quitarFavorito(ok)}> X </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            ))
        } */}
        </div>
    </section>
       )
}

const mapStateToProps = (state= initialState.favoritos) => ({
    favoritos: state
});

const mapDispatchToProps = dispatch => {
        return {
            actions: bindActionCreators(fav.favContent(), dispatch)
          }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favoritos);