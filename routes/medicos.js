
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



router.put('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
] ,actualizarMedico);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
] ,borrarMedico);


module.exports=router;