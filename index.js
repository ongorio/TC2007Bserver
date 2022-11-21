const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
// const { User, Alumno, Coordinador, Campus, Taller, Seccion, Inscripcion, Periodo } = require('./models/index');
// const { Sequelize } = require('sequelize')

const users = require('./routes/users');
const inscripcionesAlumnos = require('./routes/alumnos/inscripciones');
const tallerAlumnos = require('./routes/alumnos/taller');
const profileAlumnos = require('./routes/alumnos/profile');

const alumnosCoords = require('./routes/coordis/alumnos');
const periodosCoords = require('./routes/coordis/periodos');

const dummy = require('./routes/dummy');
const app = express();


// console.log(process.env.NODE_ENV);

if (!config.get('SECRET_KEY')){
    console.log('No Secret Key defined!');
    process.exit(1);
}

// Middleware
app.use(cors()) // Allowed cors Without restriction
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', users);
app.use('/api/', dummy);
app.use('/api/auth/', users)
app.use('/api/alumnos/', inscripcionesAlumnos);
app.use('/api/alumnos/', tallerAlumnos);
app.use('/api/alumnos/', profileAlumnos);
app.use('/api/coords/', alumnosCoords);
app.use('/api/coords/', periodosCoords);

app.get('/', async(req, res)=>{


    try{

        // const users = await User.findAll();
        // console.log(users)
        // const alumnos = await Alumno.findAll();
        // console.log(alumnos)
        // const campuses = await Campus.findAll();
        // console.log(campuses);
        // const talleres = await Taller.findAll();
        // console.log(talleres);
        // const coordinadores = await Coordinador.findAll();
        // console.log(coordinadores);
        // const secciones = await Seccion.findAll();
        // console.log(secciones);
        //    const inscripciones = await Inscripcion.findAll();
        //    console.log(inscripciones);
        
        // const taller = await Taller.findByPk(1);
        // console.log(await taller.getSeccions());
    }catch(e){
        console.log(e)
    }

    
    res.send(`Prepanet :)<!DOCTYPE html><html><body><br><h1 style="color:blue;">Proximamente... ${process.env.NODE_ENV} ${process.env.HELLO}</h1><span style="color:red;">~.~.~&nbsp;Plataforma de inscripcion de materias&nbsp;~.~.~</span></body></html>`)
});


// Launching Server
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}\nhttp://127.0.0.1:${port}`);
});
