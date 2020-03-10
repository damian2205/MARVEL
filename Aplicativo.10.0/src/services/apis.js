import React from 'react';
import axios from 'axios';


export default class Apis extends React.Component{

    constructor(){
        super();

        this.addUsers = this.addUsers.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    async getUser(){
        return await axios.get("/users");
    }

    //Funcion addUser: guardado de usuario en MongoDb.
    //Parametro: data, datos del usuario en formato JSON
    async addUsers(data){
        return await axios.post("/users/signup", data)
    }
}

// export default new (Apis);