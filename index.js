const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const { User, Alumno, Coordinador, Campus } = require('./models/index');

const users = require('./routes/users');
const app = express();

// DB Start
// require('./startup/db')();


if (!config.get('SECRET_KEY')){
    console.log('No Secret Key defined!');
    process.exit(1);
}

// Middleware
app.use(cors()) // Allowed cors Without restriction
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', users);

app.get('/', async(req, res)=>{

    const users = await User.findAll();
    console.log(users)
    const alumnos = await Alumno.findAll();
    console.log(alumnos)
    const campuses = await Campus.findAll();
    console.log(campuses);
    const coordinadores = await Coordinador.findAll();
    console.log(coordinadores);

    res.send('Prepanet :)')
});


// Launching Server
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}\nhttp://127.0.0.1:${port}`);
});
