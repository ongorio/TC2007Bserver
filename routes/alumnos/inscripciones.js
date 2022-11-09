const express = require('express');
const { Inscripcion, Taller, Seccion, Alumno, Periodo, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');
const router = express.Router();



// Inscripcion Alumno
router.post('/inscribir/:id/', auth, async(req, res)=>{

    const taller = await Taller.findByPk(req.params.id);
    const alumno = await req.user.getAlumno({include: Campus});
    let periodo = await Periodo.findOne({ where: { isActive: true }});


    if(!taller) return res.status(404).send('No Taller Found!');
    if(!periodo) return res.status(404).send('No hay periodo activo!');


    let insc = await Inscripcion.findOne({
        where: {
            alumnoId: alumno.id,
            periodoId: periodo.id 
        },
        include: {
            model: Seccion,
            where:{
                tallerId: taller.id
            }
        }
    });

    if (insc){
        return res.status(400).send('Ya inscribiste esta materia!')
    }


    // Check dependencies
    if (taller.orden > 1){
        const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
        
        
        insc = await Inscripcion.findOne({
            include: [{
                model: Seccion,
                include: {
                    model: Taller,
                    where: {
                    id: preTaller.id
                }
            }
            },
            {
                model: Alumno,
                where: {
                    id: alumno.id
                }
            }]
        });

        if (!insc || !insc.aprobado){
            return res.status(400).send('No tiene las dependencias!');
        }
    }


    let seccion = await Seccion.findOne({
        where: { isOpen: true },
        include: {
            model: Periodo,
            where: {
                id: periodo.id
            }
        }
    });

    // console.log(alumno.Campus.id)
    if (!seccion){
        let {count, rows} = await Seccion.findAndCountAll(
            {
                include: [
                    {
                        model: Taller,
                        where: {
                            id: taller.id
                        }
                    },
                    {
                        model: Periodo,
                        where: {
                            id: periodo.id
                        }
                    },
                    {
                        model: Campus,
                        where : {
                            id: alumno.Campus.id
                        }
                    }
                ]
            }
        );

        let seccNum = (count > 0) ? count + 1: 1;

        
        try{
            seccion = await Seccion.create({
                isOpen: true,
                secNum: seccNum
            })

            await seccion.setTaller(taller);
            await seccion.setPeriodo(periodo);
            await seccion.setCampus(alumno.Campus);
        }catch(e){
            console.log(e)
        }

    }
    

    try{

        let nuevaInsc = await Inscripcion.create({
            estatus: 'Cursando',
            aprobado: false,
        });
        
        nuevaInsc.setAlumno(alumno);
        nuevaInsc.setSeccion(seccion);
        nuevaInsc.setPeriodo(periodo);

        return res.send(nuevaInsc);
    }catch(e){
        console.log(e)
    }

    return res.status(400).send('something went wrong');
});



// Obtener curso a inscribir
router.get('/cursos-inscribir/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno();

    let talleres = await Taller.findAll({
        attributes: ['id', 'nombre', 'orden', 'description', 'duracion']
    });

    console.log('hey')
    for (let taller of talleres){

        let insc;
        console.log(taller.orden);
        if (taller.orden > 1){
            const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
            
            
            insc = await Inscripcion.findOne({
                include: [{
                    model: Seccion,
                    include: {
                        model: Taller,
                        where: {
                        id: preTaller.id
                    }
                }
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });
    
            if (insc && insc.aprobado){
                return res.send(taller);
            }
        }else{


            insc = await Inscripcion.findOne({
                include: [{
                    model: Seccion,
                    include: {
                        model: Taller,
                        where: {
                        id: taller.id
                    }
                }
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });

            // console.log(insc)

            if (!insc || !insc.aprobado){
                return res.send(taller)
            }

        }
        
    }
    return res.status(400).send('No tienes talleres proximos')
});



// Historial de los cursos
router.get('/historial-cursos/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno();
    // let periodo = await Periodo.findOne({ where: { isActive: true }});


    let talleres = await Taller.findAll({
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
    })


    let tall = []
    for (let taller of talleres){
        let temp = {}
        temp.id = taller.id
        temp.nombre = taller.nombre
        temp.orden = taller.orden
        temp.description = taller.description
        temp.duracion = taller.duracion
        temp.approved = false


        if (taller.Seccions){
            for (let seccion of taller.Seccions){
                if (seccion.Inscripcions){
                    for (let insc of seccion.Inscripcions){
                        if (insc.aprobado){
                            temp.approved = true;
                        }
                    }
                }
            }
        }


        tall.push(temp)
    }


    return res.send(tall);
});


module.exports = router;