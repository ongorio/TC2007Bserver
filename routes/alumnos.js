const express = require('express');
const router = express.Router();
const { Alumno, User } = require('../models/index');


router.get('/alumnos/', async (req, res)=>{
    const alumnos = await Alumno.findAll({include: User})
    res.send(alumnos)
});

module.exports = router;