const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Animal = require('../models/animal');

const animalesGet = async (req, res = response) =>{
    const { limite, desde} = req.query;
    const query = {estado: true};
    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.status(200).json({
        total,
        animales
    });
}

const getAnimalById = async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findOne({_id: id});

    res.status(200).json({
        animal
    });
}


const animalesPut = async (req, res) =>{
    const { id } = req.params;
    const { _id, raza, ...resto} = req.body;

    await Animal.findByIdAndUpdate(id, resto);
    const animal = await Animal.findByIdAndUpdate(id, resto);



    res.status(200).json({
        msg: 'Animal Actualizado exitosamente',
        animal
    });
}

const animalesDelete = async (req, res) =>{
    const { id } = req.params;
    const animal = await Animal.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Animal eliminado exitosamente'
    });
}


const animalesPost = async (req, res) =>{
    const { raza, especie, color,estadoAdoptivo, sexo } = req.body;
    const animal = new Animal ({raza, especie, color, estadoAdoptivo, sexo});

    await animal.save();
    res.status(200).json({
        animal
    });
}

module.exports = {
    animalesPost,
    animalesGet,
    getAnimalById,
    animalesPut,
    animalesDelete
}