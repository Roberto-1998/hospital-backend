require('dotenv').config();

const express=require('express');
const cors=require('cors');
const expressFileUpload=require('express-fileupload');

const { dbConnection }=require('./database/config');

//Crear el servidor de express
const app=express();

//Base de datos
dbConnection();

//?Middlewares

    //CORS
    app.use(cors());

    //JSON
    app.use(express.json());

    //FileUpload
    app.use(expressFileUpload());

    //Public folder
    app.use(express.static('public'));


    //Rutas
    app.use('/api/usuarios', require('./routes/usuarios'));
    app.use('/api/hospitales', require('./routes/hospitales'));
    app.use('/api/medicos', require('./routes/medicos'));
    app.use('/api/upload', require('./routes/uploads'));
    app.use('/api/todo', require('./routes/busquedas'));
    app.use('/api/login', require('./routes/auth'));







app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto '+process.env.PORT)
});