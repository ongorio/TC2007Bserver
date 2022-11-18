const express = require('express');
const router = express.Router();
const { Campus, User } = require('../../models/index');

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
// Posteo de login
router.post('/profile/', auth, async(req, res)=>{
    const usuario = req.params.email;
    const contra = req.params.contra;

    let verify = await User.findOne({
        where:{
            email: usuario,
            password: contra
        }
    });
    if(verify){
        return res.status(400).send('Intento de ingreso con éxito');
    }
    return res.status(404).send('Error al intentar ingresar');
    
});

// Get de la clave
router.get('/profile/', auth, async(req, res)=>{
    const code = auth.send_code(req, res);
    if(!code){
        return res.status(404).send('Error has ocurred');
    }
    return res.status(400).send({code: code});
})

module.exports = router;