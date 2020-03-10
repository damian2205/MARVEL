const mongoose = require("mongoose");
const URL = "mongodb://localhost/aplicativo_marvel";

mongoose.connect(URL ,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(db => console.log("La DB esta conectada"))
    .catch(err =>  console.error("ERROR AL CONECTAR A LA DB", err));


module.exports = mongoose;