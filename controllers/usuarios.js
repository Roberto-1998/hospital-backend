const {response, request}=require('express');
const {validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios=async(req, res=response)=>{

  const usuarios=await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuarios,
        uid:req.uid
    })
}

const crearUsuario=async(req, res=response)=>{
  
  const {email, password, nombre}=req.body;

  try {

    const existeEmail=await Usuario.findOne({email});

    if(existeEmail){
      return res.status(400).json({
        ok:false,
        msg:'El correo ya está registrado'
      })
    }

    const usuario=new Usuario(req.body);

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

     // Generar el TOKEN - JWT
     const token=await generarJWT(usuario.id);

    res.json({
        ok:true,
      usuario,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg:'Error no manejado por el backend'
    })
  }
}


const actualizarUsuario=async(req, res=response)=>{
  // TODO: Validar token y comprobar si es el usuario correcto

  const uid=req.params.id;


  try {

    const usuarioDB=await Usuario.findById(uid); 

    if(!usuarioDB){
      return res.status(400).json({
        ok:false,
        msg:'No existe un usuario por ese id'
      })
    }

    
    //Actualizaciones
    const {password, google,email,...campos}=req.body;

    if(usuarioDB.email !== email){
     
      const existeEmail=await Usuario.findOne({email});
      if(existeEmail){
        return res.status(400).json({
          ok:false,
          msg:'Ya existe un usuario con ese email'
        });
      }
    }

    
    campos.email=email;
    const usuarioActualizado=await Usuario.findByIdAndUpdate(uid, campos, {new:true});
    
    res.json({
      ok:true,
      usuario:usuarioActualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg:'Error no manejado por el backend'
    })
  }

}

const deleteUsuario=async(req, res=response)=>{

  const {id}=req.params;

  
  try {

    const existeUsuario=await Usuario.findById(id);
    if(!existeUsuario){
      return res.status(400).json({
        ok:false,
        msg:'No existe un usuario para ese id'
      })
    }
    
    await Usuario.findByIdAndDelete(id);

    res.json({
      ok:true,
      msg:'Usuario eliminado'
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg:'Error no manejado por el backend'
    })
  }

}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
}