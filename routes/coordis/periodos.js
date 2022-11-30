const express = require('express');
const router = express.Router();
const { Campus, Seccion, Alumno, Periodo, Coordinador, Taller } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

router.get('/periods/', [auth, hasPerm('isCoord')], async(req, res)=>{

    const periods = await Periodo.findAll();

    return res.send(periods);

});


router.get('/current-period/', [auth, hasPerm('isCoord')], async(req, res)=>{


    try {

        const coordi = await req.user.getCoordinador();
        const activePeriodo = await Periodo.findOne({
            attributes: ['id', 'nombre'],
            where: {
                isActive: true,
            }
        });
        res.send(activePeriodo);
    }catch(e){
        console.log(e)
        return res.send('error')
    }    
});


router.get('/period-seccions/:id/', [auth, hasPerm('isCoord')], async(req, res)=>{
    const period = await Periodo.findByPk(req.params.id);

    if (!period) return res.status(404).send('No period Found!');
    
    const coordi = await req.user.getCoordinador({ include: Campus});
    const campus = coordi.Campus;

    let secciones = await Seccion.findAll({
        where :{
            '$Periodo.id$':period.id,
            campusId: campus.id
        },
        include: [{
            model: Periodo,
            attributes: ['id', 'nombre'],
            as:'Periodo'
        },
        {
            model: Taller,
            attributes: ['id', 'nombre'],
            as: 'Taller'
        },
        ]
    });


    return res.send(secciones);


});

module.exports = router;