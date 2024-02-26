const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    mascotasGet,
    mascotasPost,
    getMascotaByid,
    mascotasPut,
    mascotasDelete
} = require('../controllers/mascota.controler');
const { existeMascotaById } = require('../helpers/db-validators');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], getMascotaByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotasPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeMascotaById),
            validarCampos
        ], mascotasDelete);

        
router.post(
    "/",
    [
        check("nombre", "El nombre no puede ir vacio").not().isEmpty(),
        check("edad", "La edad no debe superar los 30 años").not().isEmpty(),
        check("clase", "Clase de animal no valida").not().isEmpty(),
        validarCampos,
    ], mascotasPost);


module.exports = router;