
const {resolve, response}=require('express');
const jwt=require('jsonwebtoken');


const validarJWT=(req, res=response, next)=>{

    //Leer el token
    const token=req.header('x-token');
  
    //Hay token
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        })
    }

    //Varificar el token
    try {

        const {uid}=jwt.verify(token, process.env.JWT_SECRET);
        req.uid=uid;
         next();

        
    } catch (error) {
        //Usualmente se va a disparar el catch si el token no es válido
        return res.status(401).json({
            ok:false,
            msg:'Token incorrecto'
        })
    }
}

module.exports={
    validarJWT
}