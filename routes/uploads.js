/* 
Uploads
ruta: '/api/uploads'
 */

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fielUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressfileUpload() );

router.put( '/:tipo/:id', validarJWT, fielUpload);

router.get( '/:tipo/:foto', retornaImagen);

module.exports = router;