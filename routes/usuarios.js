
const {Router}=require('express');
const {check}=require('express-validator');
const {getUsuarios,crearUsuario, actualizarUsuario, deleteUsuario}=require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/',validarJWT ,getUsuarios);

router.post('/',
[
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('password', 'El password es requerido').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    validarCampos
], 
crearUsuario);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('rol', 'Es role es requerido').notEmpty(),
    validarCampos

], actualizarUsuario)


router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
] ,deleteUsuario)




module.exports=router;