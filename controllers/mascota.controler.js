const { response, json } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
} 

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { _id, edad, clase, ...resto} = req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'La mascota fue actualizada correctamente',
        mascota
    })
}

const mascotasDelete = async (req, res) => {
    const {id} = req.params;
    await Mascota.findByIdAndUpdate(id,{estado: false});

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota eliminada exitosamente',
        mascota
    });
}

const mascotasPost = async (req, res) =>{
    const { nombre, edad, clase, adoptado } = req.body;
    const mascota = new Mascota({nombre, edad, clase, adoptado});

    await mascota.save();
    res.status(200).json({
        mascota
    });
}

module.exports = {
    mascotasGet,
    mascotasDelete,
    mascotasPost,
    getMascotaByid,
    mascotasPut
}