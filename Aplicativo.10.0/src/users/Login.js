import React from 'react';
import Apis from '../services/apis';
import { withRouter } from 'react-router-dom';


require('../css/login.css')


class Logins extends React.Component{
    

    constructor(){
        
        super();
        this.state = {
            usuario: '',
            password: '',
            usuarios: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUser = this.validateUser.bind(this);
    }
    
    // Funcion de traer datos de la DB
    async validateUser (){
        var apis = new Apis();
        const usuarios = await apis.getUser().then(response => {return response.data});
       
        // console.log("usuarios de DB", usuarios);

        // Validacion para ingresar 
        var validate = (this.state.usuario === "", this.state.password === "");
        if (validate === true) {                    
            alert("Campos Obligatorios¡¡");
        }else{
        for(var i=0; i < usuarios.length ; i++){
            if((usuarios[i].password === this.state.password) && (usuarios[i].usuario === this.state.usuario)){
                alert("Usuario Logeado");
                this.props.history.push('/heroes'); //Redireccionamiento
                break;
            }
            else{
                if (i === usuarios.length-1 ) {
                    alert("usuario invalido");
                }
            }
        }
        }
        
    }

    // Guardado de valores para login
    handleChange(e, llave){
        this.setState({
            [llave]: e.target.value
        });
    }

    //Evento de validacion
    handleSubmit(event){
        event.preventDefault();
        this.validateUser();
        
        
    }
    render(){
        return(
            <div className="row">
            <div className="col-md-4 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <center className="name"><h1><b>Login Usuario</b></h1></center>
                        <div className="card-body">
                            <form id="formulario">
                                <div className="form-group">
                                    <input className="usuario" type="text" id="usuario" placeholder="Usuario" value={this.state.usuario} onChange={e => this.handleChange(e, "usuario")}></input>
                                </div>
                                <div className="form-group">
                                    <input className="password" type="password" id="password" placeholder="Contraseña" value={this.state.password} onChange={e => this.handleChange(e, "password")}></input>
                                </div>
                                <center><button className="login" type="submit" value="Submit" onClick={this.handleSubmit} >Login </button></center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Logins);          // Exportacion con modulo de redireccionamiento