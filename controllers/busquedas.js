const {response}=require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo=async(req, res)=>{

    const {termino}=req.params;

    const regex=new RegExp(termino, 'i');

    const [usuarios, medicos, hospitales]=await Promise.all([
        Usuario.find({nombre:regex}),
        Medico.find({nombre:regex}),
        Hospital.find({nombre:regex}),
    ])

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion=async(req, res)=>{

    const {tabla,termino}=req.params;

    const regex=new RegExp(termino, 'i');

    let data=[];

    switch (tabla) {
        case 'usuarios':
            data=await Usuario.find({nombre:regex})
           
        break;

        case 'medicos':
            data=await Medico.find({nombre:regex})
                            .populate('usuario', 'nombre img')  
                            .populate('hospital', 'nombre img')      
        break;

        case 'hospitales':
           data=await Hospital.find({nombre:regex})
                            .populate('usuario', 'nombre img')      
        break;
    

        default:
           return res.status(400).json({
                ok:false, 
                msg:'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        ok:true,
        resultados:data
    })
}


module.exports={
    getTodo,
    getDocumentosColeccion
}