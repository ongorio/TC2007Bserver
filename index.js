const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index');
const User = db.User;
const Alumno = db.Alumno;
const app = express();

// DB Start
require('./startup/db')();


// Middleware
app.use(cors()) // Allowed cors Without restriction
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', async(req, res)=>{

    const users = await User.findAll();
    console.log(users)
    const alumnos = await Alumno.findAll();
    console.log(alumnos)

    res.send('Prepanet :)')
});


// Launching Server
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}\nhttp://127.0.0.1:${port}`);
});
