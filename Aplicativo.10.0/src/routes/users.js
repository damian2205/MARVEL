const express =  require('express');
const router = express.Router();



const Usuario = require('../modelo/esquema');

router.get("/", (req, res)=>{
    res.send("HOLA Que tal soy init");
});

router.get("/users", async (req, res) => {
    const usuario_ = await Usuario.find();
    res.json(usuario_);
    res.send("usuario guardado")
});

router.post('/users/signup', async (req, res) => {
    console.log(req,"!!!!!!!!");
    const {usuario, nombre, password, password_} = req.body;
    const usuario_ = new Usuario({usuario, nombre, password, password_});
    console.log(req.body, usuario_,"!!!!!!!!!");
    console.log("entrob2")
    await usuario_.save();
    res.send("usuario guardado");
});


module.exports =  router;