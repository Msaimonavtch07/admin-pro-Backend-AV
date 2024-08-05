
/* 
hospitales
ruta: '/api/busquedas'
 */

const { Router } = require('express');
const { getTodo } = require('../controllers/busquedas');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busquedas', validarJWT, getTodo );

router.get( '/coleccion/:tabla/:busquedas', validarJWT, getTodo );

module.exports = router;
