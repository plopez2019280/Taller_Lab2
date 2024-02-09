const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Adopt = require('../models/adopt');
const role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeAnimalById = async ( id = '') => {
    const existeAnimal = await Animal.findOne({id});
    if(!existeAnimal){
        throw new Error(`El animal con el ${ id } no existe`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(existeRol){
        throw new Error(`el role${ role } no existe en base de datos`);
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeAnimalById
}