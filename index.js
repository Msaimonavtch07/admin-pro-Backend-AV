require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Creando el Servidor express
const app = express();

// Configurar CORS
app.use(cors())

// Base de datos...
dbConnection();

console.log(process.env)

// mean_user
// ogSolHtci4jy52LU

// Ruta
app.get( '/', ( req, res ) => {

   res.json({
    ok: true,
    msg: 'Hello world'
   });

});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', + process.env.PORT )
})
