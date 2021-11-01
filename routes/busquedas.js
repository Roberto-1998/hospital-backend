

const {Router}=require('express');
const {getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

router.get('/:termino',validarJWT ,getTodo);

router.get('/coleccion/:tabla/:termino',validarJWT ,getDocumentosColeccion);


module.exports=router;