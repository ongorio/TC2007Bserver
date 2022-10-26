const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { alumnos, talleres, campuses, coords } = require('../dummy/dummy_data');

router.get('/home/', (req, res)=>{
    const data = {
        total_alumnos: alumnos.length,
    }

    let talleres_cals = [];

    for(let i = 0; i < talleres.length; i++){
        let temp = {
            name: talleres[i].nombre,
            promedio: Math.floor(Math.random()*100)
        }
        talleres_cals.push(temp);
    }

    data.promedios = talleres_cals;

    let total_alums = []
    for(let i = 0; i < campuses.length; i++){
        console.log(i)
        let t =  alumnos.reduce((acc, alumno)=>{
            if (alumno.campus.name === campuses[i].name){
                return acc + 1
            }
            return acc;

        },0);
        
        let temp = {
            campus: campuses[i].name,
            alumnos:t
        }
        total_alums.push(temp)
    }

    data.alumno_por_campus = total_alums;

    res.send(data)


})

router.get('/alumnos/', (req, res)=>{

    res.send(alumnos)

});

router.get('/coordinadores/', (req, res)=>{
   res.send(coords);
});

router.get('/periodos/', (res, req)=>{

});

module.exports = router;