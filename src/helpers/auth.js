
const helpers =  {};
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'No autorizado');
    res.redirect('/users/signin');
};

module.exports = helpers;