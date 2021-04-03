const mongoose = require('mongoose');
const User = require('../models/Users');

exports.index = function(req, res) {
    res.render('repair.pug', {
        auth: req.session.idi
    });
};

exports.register = function(req, res) {
    res.render('register.pug', {
        auth: req.session.idi
    });
};

exports.registerCheck = function(req, res) {
    if (!req.body) return res.redirect('/register');

    let name = req.body.name;
    let surname = req.body.surname;
    let lastname = req.body.lastname;
    let city = req.body.city;
    let login = req.body.login;
    let pass = req.body.pass;

    let user = new User({
        name: name,
        surname: surname,
        lastname: lastname,
        city: mongoose.Types.ObjectId(city),
        login: login,
        pass: pass,
        status: 0
    });

    user.save();

    res.redirect('login');
};

exports.login = function(req, res) {
    res.render('login.pug', {
        auth: req.session.idi
    });
}

exports.loginCheck = function(req, res) {
    if (!req.body) return res.redirect('/login');

    let login = req.body.login;
    let pass = req.body.pass;

    User.findOne({login: login, pass: pass}, function(err, result) {
        if (result == null) {
            console.log(err);
            return res.redirect('/login');
        }

        req.session.auth = true;
        console.log(result);
        req.session.idi = result._id;
        
        return res.redirect('/repair');
    });

}