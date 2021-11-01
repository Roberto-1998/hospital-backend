
const {response}=require('express');
const Hospital=require('../models/hospital');


const getHospitales=async(req, res=response)=>{

   const {desde=0, limite=5}=req.query;

    const [total, hospitales]=await Promise.all([
        Hospital.countDocuments(),
        Hospital.find()
                        .populate('usuario', 'nombre img')
                        .skip(Number(desde))
                        .limit(Number(limite))
        
    ])

    res.json({
        ok:true,
        total,
        hospitales
    })

}

const actualizarHospital=(req, res=response)=>{
    res.json({
        ok:true,
        msg:'ActualizarHospital'
    })
    
}

const crearHospital=async(req, res=response)=>{

    
    const uid=req.uid;
    const hospital=new Hospital({
        usuario:uid,
        ...req.body
    });

    try {

       const hospitalDB= await hospital.save();


         res.json({
            ok:true,
            hospital:hospitalDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error no manejado por el backend'
        })
        
    }

   
    
}

const borrarHospital=(req, res=response)=>{
    res.json({
        ok:true,
        msg:'BorrarHospital'
    })
    
}

module.exports={
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital
}