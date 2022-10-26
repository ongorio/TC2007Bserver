const express = require('express');
const router = express.Router();
const { User } = require('../models/index');
const Joi = require('joi');
const auth = require('../middleware/Auth');
const { hasPerm } = require('../middleware/Auth');

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

// Get token view
router.post('/generate-token/', async(req, res)=>{

    const { error } = loginSchema.validate(req.body);
    if(error) return res.status(400).send('Wrong email or password!')

    const user = await User.findOne({ where: {email : req.body.email }});
    if (!user) return res.status(400).send('Wrong email or password!');

    const isValid = await user.validate_password(req.body.password);
    if (!isValid) return res.status(400).send('wrong email or password!');

    return res.send(user.generateToken());
});


router.get('/protected/', [auth, hasPerm('isAlumno')], (req, res)=>{
    res.send(req.user);
}); 


module.exports = router;