
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

const actualizarHospital=async(req, res=response)=>{

    const {id}=req.params;
    const uid=req.uid;

    try {
             const existeHospital=await Hospital.findById(id);
            if(!existeHospital){
                return res.status(400).json({
                    ok:false,
                    msg:'No existe un hospital para ese id'
                })
            }

            const cambiosHospital={
                ...req.body,
                usuario:uid
            }

            const hospitalActualizado=await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});


            res.json({
                ok:true,
                hospital:hospitalActualizado
            })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error no manejado por el backend'
        })
        
    }
    
    
    
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

const borrarHospital=async(req, res=response)=>{

    const {id}=req.params;

    try {

        const existeHospital=await Hospital.findById(id);
        if(!existeHospital){
            return res.status(400).json({
                ok:false,
                msg:'No existe un hospital para ese id'
            })
        }

        const hospitalBorradoo=await Hospital.findByIdAndDelete(id);


        res.json({
            ok:true,
        hospital: hospitalBorradoo
        })
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error no manejado por el backend'
        })
        
    }

   
}

module.exports={
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital
}