const {Schema, model} = require('mongoose');
 
const AdoptSchema = Schema ({
    role:{
        type:String,
        required: [true, "El estado adoptivo debe ser obligatorio"]
    }
});
 
module.exports = model ('Adopt', AdoptSchema);