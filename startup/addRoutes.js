// Admin Routers
const alumnosAdmin = require('./routes/admins/alumnos');
const reporteAdmin = require('./routes/admins/report');
const periodosAdmin = require('./routes/admins/periodos');

// Coords Routers
const alumnosCoords = require('./routes/coordis/alumnos');
const periodosCoords = require('./routes/coordis/periodos');
const reportCoords = require('./routes/coordis/report');

// Alumnos Routers
const inscripcionesAlumnos = require('./routes/alumnos/inscripciones');
const tallerAlumnos = require('./routes/alumnos/taller');
const profileAlumnos = require('./routes/alumnos/profile');

// General Users Routers
const users = require('./routes/users');

// Dummy Routers
const dummy = require('./routes/dummy');


module.exports = app =>{

    // General Users Routes
    app.use('/', users);
    app.use('/api/auth/', users)

    // Admin Routes
    app.use('/api/admin/', reporteAdmin);
    app.use('/api/admin/', alumnosAdmin);
    app.use('/api/admin/', periodosAdmin);


    // Coords Routes
    app.use('/api/coords/', alumnosCoords);
    app.use('/api/coords/', periodosCoords);
    app.use('/api/coords/', reportCoords);


    // Alumnos Routes
    app.use('/api/alumnos/', inscripcionesAlumnos);
    app.use('/api/alumnos/', tallerAlumnos);
    app.use('/api/alumnos/', profileAlumnos);

    // Dummy Routes
    app.use('/api/', dummy);

    // Home Page
    app.get('/', async(req, res)=>{
        res.send(`
            <!DOCTYPE html>
            <html>
            <body>
            <h1 style="color:blue;">PrepaNET API</h1>
            <hr/>
            <p>
            Running on: ${process.env.NODE_ENV} <br/>
            Message of the day: ${process.env.HELLO}
            </p>
            </body>
            </html>
        `)
    });
    

};