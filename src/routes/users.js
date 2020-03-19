const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/donaciones',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const errors = [];

    const { name, apellido, pais, ciudad, celular, email, password, confirmar_password } = req.body;
    if(password != confirmar_password){
        errors.push({ text: 'password no coincide'});
    }
    if(password.length < 4) {
        errors.push({ text: 'password debe ser mayor de 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            apellido,
            pais,
            ciudad,
            celular,
            email,
            password,
            confirmar_password 
        });
    } else {
        const emailUser = await User.findOne({ email: email });
        if(emailUser) {
            req.flash("error", "Este email ya esta registrado.");
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Estas registrado');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;