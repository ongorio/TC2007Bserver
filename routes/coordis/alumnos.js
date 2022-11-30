const express = require('express');
const router = express.Router();


const { Alumno, Seccion, Inscripcion, Taller, User, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');


router.get('/alumnos/', [auth, hasPerm('isCoord')], async(req, res)=>{
    
    const coordi = await req.user.getCoordinador({include: Campus});
    const campus = await coordi.Campus;

    let alumnos = await Alumno.findAll({
        where:{
            'campusId': campus.id
        },
        include: [{
            model: User,
            attributes: [
                'id', 'first_name', 'last_name'
            ]
        },
        {
            model: Campus,
            attributes: [
                'id', 'name'
            ]
    }]
    });
    
    let alumnos2Send = [];
    
    for (let alumno of alumnos){
        let temp = {}
        temp.id = alumno.id;
        temp.first_name =  alumno.User.first_name;
        temp.last_name =  alumno.User.last_name;
        temp.matricula = alumno.matricula;
        temp.campus = {
            id: alumno.Campus.dataValues['id'],
            nombre: alumno.Campus.dataValues['name']
        }
        temp.taller = null;
        
        let inscs = await alumno.getInscripcions({
            where:{
                estatus: 'Cursando'
            },
            include: {
                model: Seccion,
                include: {
                    model: Taller
                }
            }
        });
        
        if (inscs[0]){
            let insc = inscs[0].dataValues;
            
            let taller = insc.Seccion.dataValues.Taller
            temp.taller = { id: taller.id, nombre: taller.nombre };
            
        }
        alumnos2Send.push(temp);

    }
    res.send(alumnos2Send)
});


router.get('/alumno/:id', [auth, hasPerm('isCoord')], async(req, res)=>{
    const alumno = await Alumno.findByPk(req.params.id, {
        include:[
            {
                model: User
            },
            {
                model: Campus
            }
        ]
    });
    const user = await alumno.User;
    const campus = await alumno.Campus;


    const talleres = await Taller.findAll({
        attributes: ['id', 'nombre', 'orden', 'description', 'duracion'],
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


    // console.log(talleres);

    let talleres2Send = [];
    for (let taller of talleres){
        
        let temp = {};
        temp.id = taller.id
        temp.nombre = taller.nombre
        temp.orden = taller.orden
        temp.description = taller.description
        temp.duracion = taller.duracion
        temp.approved = false;
        temp.estatus = 'Sin Cursar'

        if (taller.Seccions){
            for (let secc of taller.Seccions){
                if (secc.Inscripcions){
                    for (let insc of secc.Inscripcions){
                        if (insc.aprobado){
                            temp.approved = true;
                        }
                        temp.estatus = insc.estatus
                    }
                }
            }
        }
        talleres2Send.push(temp);
        
    }
    
    let alumnos2Send = {
        id: alumno.id,
        first_name: user.dataValues['first_name'],
        last_name: user.dataValues['last_name'],
        email: user.dataValues['email'],
        matricula: alumno.matricula,
        campus: {
            id: campus.dataValues['id'],
            name: campus.dataValues['name']
        },
        talleres: talleres2Send
    }

    return res.send(alumnos2Send);

})


module.exports = router;