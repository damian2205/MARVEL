const express = require("express");
const morgan = require("morgan");
// const path = require("path");
const app = express();
require("./src/database");

// CONFIGURACIONES
app.set("port", process.env.PORT || 4000);


//Middlewares
app.use(morgan("dev")); 
app.use(express.json());

// RUTAS 
app.use(require('./src/routes/users'));
app.get("/users", require("./src/routes/users"));
app.post('/users/signup', require('./src/routes/users'));
app.get('/users/signin', require('./src/routes/users'));
app.get("/", require('./src/routes/users'));



//SERVIDOR INICIADO
app.listen(app.get("port"), () => {
    console.log("servidor en puerto", app.get("port"));
});
