
const {response}=require('express');
const bcrypt=require('bcryptjs');
const Usuario=require('../models/usuario');
const {generarJWT}=require('../helpers/jwt');


const login=async(req, res=response)=>{

    const {password, email}=req.body;

    try {

         // Verificar email
        const usuarioDB=await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Contraseña o email no válidos'
            })
        }

        // Verificar contraseña
        const validPassword=bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña o email no válidos'
            })
        }

        // Generar el TOKEN - JWT
        const token=await generarJWT(usuarioDB.id);
       
        
        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Error no manejado por el backend'
        })
    }



}

module.exports={
    login
}