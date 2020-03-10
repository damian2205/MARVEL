import React from 'react';
import Apis from '../services/apis.js';
import {withRouter} from 'react-router-dom';
require('../css/registro.css');

class Registros extends React.Component{
    
    constructor(){
        super();
        this.state = {
            usuario: '',
            nombre: '',
            password: '',
            password_: ''
        }  

        this.data = {
            cositas: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUser = this.validateUser.bind(this);
        // this.Users = this.addUsers;
        // this.getUsers = this.getUsers.bind(this);
    }

    // Almacenamiento de valores de registro
    handleChange(e, key){
        // console.log("value user =", this.state.usuario, this.state.nombre, this.state.password, this.state.password_);
        this.setState({
            [key]: e.target.value
            }); 
    // onChange={this.handleChange}
    }
    
    
    /// Validacion de usuario e ingresos de datos a la DB
    async validateUser (){
        console.log("entro")
        var apis = new Apis();
        const userss = await apis.getUser().then(response => {return response.data});
       
        //Validacion de usuario ya registrado
        for(var i=0; i < userss.length ; i++){
            if((userss[i].usuario === this.state.usuario)){             
                console.log("Validacion.usuario", userss[i].usuario);
                alert("Usuario ya registrado¡¡¡");
            }
        }

        //Validaion de campos
        const expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        const validate = (this.state.usuario === "", this.state.nombre === "", this.state.password === "", this.state.password_ === "");
        if (validate === true) {                    
            alert("Campos Obligatorios¡¡");
        }else    
        if(this.state.password !== this.state.password_){          
            alert("Constraseñas no coinciden verifique por favor");
        }else 
        if(!expresion.test(this.state.password, this.state.password_)){
                    alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.");
        }else{
        let dataa = await apis.addUsers(this.state).then(response => {return response.data});
        console.log(dataa);
        alert(dataa);
        this.props.history.push('/login');   /// Redireccionamiento 
        }
    }


        // Funcion de ejecucion 
    handleSubmit(e){

        //Llamado de funciones
        e.preventDefault();
        this.validateUser();


    }


    render(){
        return(
            <section>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <center className="name"><h1><b>Registro Usuario</b></h1></center>
                                <div className="card-body">
                                    <form id="formulario">
                                        <div className="form-group">
                                            <input className="usuario" type="text" id="usuario" placeholder="Usuario" value={this.state.usuario} onChange={e => this.handleChange(e, "usuario")} ></input>
                                        </div>
                                        <div className="form-group">
                                            <input className="nombre" type="text" id="nombre"  placeholder="Nombre" value={this.state.nombre} onChange={e => this.handleChange(e, "nombre")}></input>
                                        </div>
                                        <div className="form-group">
                                            <input className="password" type="password" id="password" placeholder="Constraseña" value={this.state.password} onChange={e => this.handleChange(e, "password")}></input>
                                        </div>
                                        <div className="form-group">
                                            <input className="password1" type="password" id="password_" placeholder="Confirmar constraseña" value={this.state.password_} onChange={e => this.handleChange(e, "password_")}></input>
                                        </div>
                                        <center><button className="registro" type="submit" value="Submit" onClick={this.handleSubmit}> Registrar </button></center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Registros);   // Exportacion con modulo de redireccionamiento