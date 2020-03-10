const mongoose = require("mongoose");
const { Schema } = mongoose;
// const bcrypt = require('bcrypt');

const usuarioEsquema = new Schema({
    usuario: { type: String, unique: true, required: true },
    nombre: { type: String, required: true },
    password: {type: String, required: true},
    password_: {type: String, required: true}
});

module.exports = mongoose.model("Usuario", usuarioEsquema);

