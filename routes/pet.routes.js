const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { animalesPost, animalesGet, getAnimalById, animalesPut, animalesDelete } = require('../controllers/pet.controller');
const { existeAnimalById } = require('../helpers/db-validator');

const router = Router();

router.get("/", animalesGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAnimalById),
        validarCampos
    ], getAnimalById);
router.post(
    "/",
    [
        check("raza", "La raza es obligatoria").not().isEmpty(),
        check("especie", "La especie es obligatoria").not().isEmpty(),
        check("color", "El color es obligatorio").not().isEmpty(),
        check("estadoAdoptivo", "El estado adoptivo es obligatorio").not().isEmpty(),
        check("sexo", "Debe tener un género").not().isEmpty(),
        validarCampos,
    ], animalesPost);
router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAnimalById),
        validarCampos
    ], animalesPut);
router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAnimalById),
        validarCampos
    ], animalesDelete);

module.exports = router;