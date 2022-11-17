const express = require('express');
const router = express.Router();
const { Campus } = require('../../models/index');

const auth = require('../../middleware/Auth');

router.get('/profile/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno({ include: {
        model: Campus,
        attributes: ['id', 'name']
    }});


    object2Send = {
        id: alumno.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        matricula: alumno.matricula,
        campus: alumno.Campus,

    }

    res.send(object2Send);
});


module.exports = router;