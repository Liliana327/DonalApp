const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
    const { nombre, apellido, pais, ciudad, celular, email, password, confirmar_password } = req.body;
    const errors = [];
    if(nombre.length <= 0){
        errors.push({text: 'Por favor ingresa tu nombre'})
    }
    if(password != confirmar_password){
        errors.push({text: 'password no coincide'});
    }
    if (password.length > 4) {
        errors.push({text: 'password debe ser mayor de 4 caracteres'});
    }
    if (errors.length > 0){
        res.render('users/signup', {errors, nombre, apellido, pais, ciudad, celular, email, password, confirmar_password })
    } else {
        res.send('ok')
    }
});

module.exports = router;