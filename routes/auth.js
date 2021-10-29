const {Router}=require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router=Router();


router.post('/', [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').notEmpty(),
    validarCampos
], login)




module.exports=router;