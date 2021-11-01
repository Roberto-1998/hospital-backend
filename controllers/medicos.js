
const {response}=require('express');
const Medico=require('../models/medico');
const Hospital=require('../models/hospital');

const getMedicos=async(req, res=response)=>{

    const {desde=0, limite=5}=req.query;

    const [total, medicos]=await Promise.all([
        Medico.countDocuments(),
        Medico.find()
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')

    ])


    res.json({
        ok:true,
        total,
       medicos
    })

}

const crearMedico=async(req, res=response)=>{

    const uid=req.uid;
    const hospitalId=req.body.hospital;
    const medico=new Medico({
        usuario:uid,...req.body
    });

    const existeHospital=await Hospital.findById(hospitalId);
    if(!existeHospital){
        return res.status(400).json({
            ok:false,
            msg:'No exise un hospital con ese Id'
        })
    }


    try {

      const medicoDB=await medico.save();

      res.json({
        ok:true,
       medico:medicoDB
    })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error no manejado por el backend'
        })
    }

   

}

const actualizarMedico=(req, res=response)=>{

    res.json({
        ok:true,
        msg:'ActualizarMedico'
    })

}

const borrarMedico=(req, res=response)=>{

    res.json({
        ok:true,
        msg:'BorrarMedico'
    })

}

module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}