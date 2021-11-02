
const {response}=require('express');
const bcrypt=require('bcryptjs');
const Usuario=require('../models/usuario');
const {generarJWT}=require('../helpers/jwt');
const {googleVerify}=require('../helpers/google-verify');


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



const googleSignIn=async(req, res=response)=>{

    const {token:googleToken}=req.body;

    try {

       const {name, email, picture}=await googleVerify(googleToken);

       //Verificar si existe email
       const usuarioDB=await Usuario.findOne({email});
       if(!usuarioDB){
           //si no existe el usuario
            usuario=new Usuario({
                nombre:name,
                email,
                img:picture,
                password:'@@@',
                google:true
            })
       }else{
           //existe usuario
           usuario=usuarioDB;
           usuario.google=true;
          
       }

       //Guardar en DB
       await usuario.save();

        // Generar el TOKEN - JWT
        const token=await generarJWT(usuario.id);


        res.json({
        ok:true,
       token
    })
        
    } catch (error) {


        res.status(401).json({
        ok:false,
        msg:'Token no es correcto',
        googleToken
    })
        
    }
}

const renewToken=async(req, res=response)=>{


    const uid=req.uid;

     // Generar el TOKEN - JWT
     const token=await generarJWT(uid);



    res.json({
        ok:true,
        token
    })
}



module.exports={
    login,
    googleSignIn,
    renewToken
}