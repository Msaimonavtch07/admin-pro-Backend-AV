require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Creando el Servidor express
const app = express();

// Configurar CORS
app.use(cors());

// lectura y parseo del Body
app.use( express.json() );

// Base de datos...
dbConnection();

/* console.log(process.env) */

// mean_user
// ogSolHtci4jy52LU

// Ruta
app.use('/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth') );

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', + process.env.PORT )
})
