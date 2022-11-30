const express = require('express');
const router = express.Router();
const Joi = require('joi');

const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

const { Periodo, Seccion, Taller } = require('../../models/index');


const periodSchema = Joi.object({
    nombre: Joi.string().required()
})

router.post('/add-period/', [auth, hasPerm('isAdmin')], async(req, res)=>{

    const { error } = periodSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);


    let period = await Periodo.create({
        nombre: req.body.nombre,
        isActive: false
    });

    return res.send(period);
});


router.get('/periods/', [auth, hasPerm('isAdmin')], async(req, res)=>{

    const periodos = await Periodo.findAll();

    return res.send(periodos);
});


router.get('/current-period/', [auth, hasPerm('isAdmin')], async(req, res)=>{
    
    const activePeriod = await Periodo.findOne({
        attributes: [
            'id', 'nombre'
        ],
        where: {
            isActive:true
        }
    });

    if (!activePeriod) res.status(404).send('No hay periodo Activo');

    return res.send(activePeriod);
});


router.get('/period-seccions/:id/', [auth, hasPerm('isAdmin')], async(req,res)=>{

    const periodo = await Periodo.findByPk(req.params.id);
    if (!periodo) return res.status(404).send(periodo);

    let secciones = await Seccion.findAll({
        where: {
            '$Periodo.id$': periodo.id
        },
        include: [
            {
                model: Periodo,
                as: 'Periodo',
                attributes:[
                    'id', 'nombre'
                ]
            },
            {
                model: Taller,
                attributes:[
                    'id', 'nombre'
                ],
                as: 'Taller'
            }
        ]
    });

    return res.send(secciones);

});


module.exports = router;
