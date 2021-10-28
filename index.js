require('dotenv').config();

const express=require('express');
const cors=require('cors');

const { dbConnection }=require('./database/config');

//Crear el servidor de express
const app=express();

//Base de datos
dbConnection();

//Middlewares
app.use(cors());

//Rutas
app.get('/', (req, res)=>{
    res.status(400).json({
        msg:'Hola mundo'
    })
})




app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto '+process.env.PORT)
});