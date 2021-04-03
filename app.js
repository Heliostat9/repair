const express = require('express');
const session = require('express-session');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({secret: 'tss', saveUninitialized: false, resave: false}));

app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose');

const homeRouter = require('./routes/homeRouter');
const repairRouter = require('./routes/repairRouter');

const dbFilePath = 'mongodb://localhost:27017/repairdb';


mongoose.connect(dbFilePath,{useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if (err) return console.log(err);

    app.listen(3000, () => {
        console.log('Server done and wait connections...');
    });
});


app.use('/repair', function(req, res, next) {
    if (req.session.auth != true) return res.redirect('/login');
    next();
});

app.use('/repair', repairRouter);
app.use('/', homeRouter);

