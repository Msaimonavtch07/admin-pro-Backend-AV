const { response } = require('express');

const Medico = require('../model/medicos')

const getMedicos = async ( req, res = response ) => {

    const Medicos = await Medico.find()
                                .populate('usuario', 'nombre img' )
                                .pupulate('hospitales', 'nombre img' );
   
    res.json({
        ok: true,
        Medicos
    });
    
};

const crearMedicos = async( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
   
    try {

        const MedicoDB = await medico.save();

        res.json({
            ok: true,
            medico: MedicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    };
    
};

const actualizarMedicos = ( req, res = response ) => {
   
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    });
    
};

const borrarMedicos= ( req, res = response ) => {
   
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
    
};

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
};