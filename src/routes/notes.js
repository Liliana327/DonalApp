const express = require('express');
const router = express.Router();

const Donaciones = require('../models/Donaciones');
const { isAuthenticated } = require('../helpers/auth');

router.get('/donacion/crear', isAuthenticated, (req, res) => {
    res.render('Donaciones/nueva-donacion')
});

router.post('/donacion/crear', isAuthenticated, async (req, res) => {
    const { title, descripcion } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Por favor escriba un titulo.'});
    }
    if(!descripcion){
        errors.push({text: 'Por favor agregue una descripcion.'})
    }
    if(errors.length > 0) {
        res.render('Donaciones/nueva-donacion', {
            errors,
            title,
            descripcion
        });
    } else {
        const newDanaciones = new Donaciones({ title, descripcion});
        newDanaciones.user = req.user.id;
        await newDanaciones.save();
        req.flash('success_msg', 'Tu donacion ha sido publicada.')
        res.redirect('/donaciones');
    }    
});

router.get('/donaciones', isAuthenticated, async (req, res) =>{
    const DataDonaciones = await Donaciones.find({user: req.user.id}).sort({fecha: 'desc'});
    res.render('Donaciones/todas-las-donaciones', { DataDonaciones })
});

router.get('/donacion/editar/:id', isAuthenticated, async (req, res) =>{
    const Donar = await Donaciones.findById(req.params.id)
    res.render('Donaciones/edit-donacion', {Donar});
});

router.put('/donacion/editar/:id', async (req, res) => {
    const { title, descripcion }= req.body;
    await Donaciones.findByIdAndUpdate(req.params.id, { title, descripcion });
    req.flash('success_msg', 'Tu donacion ha sido actualizada.')
    res.redirect('/donaciones');
});

router.delete('/donaciones/eliminar/:id', isAuthenticated, async (req, res) =>{
    await Donaciones.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Tu donacion ha sido eliminada.')
    res.redirect('/donaciones');
});

module.exports = router;