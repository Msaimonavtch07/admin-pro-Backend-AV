const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { response } = require('express');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fielUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo...
    const tiposValidos = [ 'usuarios', 'medicos', 'hospitales' ];
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital, (Tipo)',
        });
    };

    // validar que exista el archivo...
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontro ningun archivo...',
        });
    };

    // procesar la imagen...
    const file = req.files.imagen; 

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extensiones...
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes(extensionArchivo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontro ninguna extension permitida...',
        });
    };

    //Generar el nombre del Archivo...
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`

    // Path para guardar la img...
    const path = `./uploads/${tipo}/${extensionArchivo}`;

    //Mover la imgen...
    file.mv( path, (err) => {
      if (err) {

        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al subir la imagen',
            
        })

      };

        // Actualizar la base de datos ...
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
           ok: true,
           msg: 'Archivo subido',
           nombreArchivo,
        });
    });
   
    
};

const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, ` ../uploads/${ tipo }/${ foto } `);

    // imagen por defecto...
    if( fs.existsSync(pathImg) ) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, ` ../uploads/No-Img.jpg `);
        res.sendFile(pathImg);
    }

};

module.exports = {
    fielUpload,
    retornaImagen,
};
