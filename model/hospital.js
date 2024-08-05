const { Schema, model, Collection } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }
    
}, {Collection: 'Hospitales'} );


HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );
