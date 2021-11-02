
const {Router}=require('express');
const {check}=require('express-validator');
const { getHospitales, actualizarHospital, crearHospital, borrarHospital } = require('../controllers/hospitales');
const {validarCampos}=require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');


const router=Router();


router.get('/', getHospitales);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del hospital es requerido').notEmpty(),
    validarCampos
] ,crearHospital);

router.put('/:id',[
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('nombre', 'El nombre es requerido').notEmpty(),
    validarCampos
], actualizarHospital);

router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
] , borrarHospital);


module.exports=router;