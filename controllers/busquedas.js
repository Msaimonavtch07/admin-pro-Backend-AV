const { response } = require('express');

const Usuario = require('../model/usuario');
const Medico = require('../model/medicos');
const Hospital = require('../model/hospital');

const getTodo = async ( req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    // alternativa de codigo "mucho mas lento"... 
    /* const usuarios = await Usuario.find({  nombre: regex });
    const medicos = await Medico.find({  nombre: regex });
    const hopitales = await Hospital.find({  nombre: regex }); */

    const [ usuarios, medicos, hopitales ] = await Promise.all([

        Usuario.find({  nombre: regex }),
        Medico.find({  nombre: regex }),
        Hospital.find({  nombre: regex }),

    ]);
   
    res.json({
        ok: true,
        usuarios,
        medicos,
        hopitales,
    });
    
};

const getDocuementoColeccion = async ( req, res = response ) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case medicos:
            data = await Medico.find({  nombre: regex })
                               .populate('usuario', 'nombre img' )
                               .pupulate('hospitales', 'nombre img' );
            
        break;

        case hopitales:
            data = await Hospital.find({  nombre: regex })
                                .populate('usuario', 'nombre img' );
 
        break;

        case usuarios:
            data = await Usuario.find({  nombre: regex });

        break;
    
        default:

        return res.status(400).json({
            ok: false,
            msg: 'la Tabla tiene que ser usuarios/medicos/hospitales',
        });

        
    }

    res.json({
        ok: true,
        resultado: data,
    });
    
};

module.exports = {
    getTodo,
    getDocuementoColeccion,
};
