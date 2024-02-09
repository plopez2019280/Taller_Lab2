const { Schema, model} = require('mongoose');

const AnimalSchema = Schema ({
    raza: {
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    especie: {
        type: String,
        required: [true, 'La especie es obligatoria']
    },
    color: {
        type: String,
        required: [true, 'El color es obligatorio']
    },
    estadoAdoptivo:{
        type: String,
        required: [true, 'El estado adoptivo es obligatorio']
    },
    sexo:{
        type: String,
        required: [true, 'Debe tener un género']
    },
    estado:{
        type: Boolean,
        default: true
    },

});


module.exports = model('Animal', AnimalSchema);