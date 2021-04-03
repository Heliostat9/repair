const express = require('express');
const homeController = require('../controllers/homeController');

const homeRouter = express.Router();

homeRouter.get('/news', function(req, res) {
    res.render('news.pug', {
        auth: req.session.auth,
    });
});

homeRouter.get('/about', function(req, res) {
    res.render('about.pug', {
        auth: req.session.auth,
    });
});

homeRouter.get('/register', homeController.register);
homeRouter.post('/register', homeController.registerCheck);
homeRouter.get('/login', homeController.login);
homeRouter.post('/login', homeController.loginCheck);
homeRouter.get('/', homeController.index);

module.exports = homeRouter;