const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/index');

router.get('/users/', async(req, res)=>{
    const users = await User.findAll();

    res.send(users);
});

router.post('/users/', async(req, res)=>{
    let user = await User.build({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        isAlumno: req.body.isAlumno,
    });

    user = await user.save()
    res.send(user);
});

router.post('/login/', async(req, res)=>{
    const user = await User.findOne({where: {email: req.body.email}});

    if (!user) return res.status(400).send("Email not found!");

    const valid = await user.validate_password(req.body.password);

    if (!valid) return res.status(400).send("Password wrong")

    return res.send(user.generateToken());
});

router.get('/protected/', async(req, res)=>{
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token included');

    try {
        const decoded = jwt.verify(token, config.get('SECRET_KEY'));
        const user = await User.findByPk(decoded._id);
        return res.send(user)
    } catch(e){
        res.status(400).send('Bad Token')
    }
    
});


module.exports = router;