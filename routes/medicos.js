
const {Router}=require('express');
const {check}=require('express-validator');
const { crearMedico, actualizarMedico, borrarMedico, getMedicos } = require('../controllers/medicos');

const {validarCampos}=require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');

const router=Router();

router.get('/', getMedicos);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('hospital', 'El hospital es requerido').isMongoId(),
    validarCampos
] ,crearMedico);

router.put('/:id', actualizarMedico);

router.delete('/:id', borrarMedico);


module.exports=router;