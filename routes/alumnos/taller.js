const express = require('express');
const { Taller, Seccion, Inscripcion } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

const router = express.Router();

// Get taller a detalle
router.get('/taller/:id/', [auth, hasPerm('isAlumno')], async(req, res)=>{
    const alumno = await req.user.getAlumno();

    const taller = await Taller.findByPk(req.params.id, {
        include: {
            model: Seccion,
            include: {
                model: Inscripcion,
                where: {
                    alumnoId: alumno.id
                }
            }
        }
    });

    if (!taller) return res.status(404).send('No Taller Found!');


    let taller2Send = {}

    taller2Send.id = taller.id
    taller2Send.nombre = taller.nombre
    taller2Send.description = taller.description
    taller2Send.duracion = taller.duracion
    taller2Send.orden = taller.orden
    taller2Send.aprobado = false;
    taller2Send.estatus = 'Sin Cursar'
    taller2Send.dependencias = null;

    if (taller.Seccions){
        for (let seccion of taller.Seccions)
        {
            for (let insc of seccion.Inscripcions){
                if (insc.aprobado) {
                    taller2Send.aprobado = true;
                    taller2Send.estatus = insc.estatus;
                    break;
                }
                taller2Send.estatus = insc.estatus;
            }
        }
    }

    if (taller.orden > 1){
        let dependencia = await Taller.findOne({
            attributes: ['id', 'nombre', 'orden'],
            where:{
                orden: taller.orden - 1
            },
            include: {
                model: Seccion,
                include: {
                    model: Inscripcion,
                    where: {
                        alumnoId: alumno.id
                    }
                }
            }
        });

        depen2send = {}

        depen2send.id = dependencia.id;
        depen2send.nombre = dependencia.nombre;
        depen2send.orden = dependencia.orden;
        depen2send.aprobado = false;

        if (dependencia.Seccions){
            for (let seccion of dependencia.Seccions)
            {
                for (let insc of seccion.Inscripcions){
                    if (insc.aprobado) depen2send.aprobado = true;
                }
            }
        }

        taller2Send.dependencias = depen2send;
    }


    return res.send(taller2Send);
});


module.exports = router;