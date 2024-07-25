const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_CNN , /* {
            useNewUrlParser:    true,
            useUniFiedTopology: true,
            useCreateIndex:     true,
        } */);

        console.log('DB Online');

    } catch (error) {

        console.log(error)
        throw new Error('Acaba de fallar algo en la BD logy')
        
    }

};

module.exports = {
    dbConnection
};
