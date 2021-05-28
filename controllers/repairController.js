const User = require('../models/Users');
const Order = require('../models/Order');
const Group = require('../models/Group');
const City = require('../models/City');
const Consult = require('../models/Consult');
const mongoose = require('mongoose');
const createReport = require('docx-templates');
const fs = require('fs');
const path = require('path');

exports.main = function(req, res) {
    let name;
    
    User.findOne({_id: mongoose.Types.ObjectId(req.session.idi)}, function(err, result) {
        if (err) {
            return console.log(err);
        }

        user = result;
        console.log(user);

        res.render('main.pug', {
            user: user,
            
            auth: req.session.idi,
            status: user.status
        });
    });

} 

exports.addOrderCheck = function(req, res) {
    if (!req.body) return res.redirect('/repair');

    let item = req.body.item;
    let description = req.body.description;
    let status = "60649dc57fcbcf84a283c804";

    let order = new Order({
        item: item,
        description: description,
        user: req.session.idi,
        status: mongoose.Types.ObjectId(status),
    })

    order.save();

    res.redirect('/repair');

};

exports.printOrder = async function(req, res) {
    const template = fs.readFileSync('./public/template.docx');

    const order = await Order.findById({_id: mongoose.Types.ObjectId(req.params.id)}).populate({path: 'user', populate: {path: 'city'}});

    console.log(createReport);
    let buffer = await createReport.createReport({
            template,
            data: {
                id: order._id,
                сlientsurname: order.user.surname,
                сlientname: order.user.name,
                сlientlastname: order.user.lastname,
                ssurname: 'Гаязов',
                city: order.user.city.name,
                sname: 'Динар',
                slastname: 'Маратович',
                item: order.item,
                description: order.description,
                price: 0,
                date: (new Date()).toString(),
            },
    });
    

    fs.writeFileSync(('report' + req.params.id + '.docx'), buffer);
    res.sendFile(path.join(__dirname, '../', 'report' + req.params.id + '.docx'));
};

exports.addOrder = function(req, res) {
    res.render('addOrder.pug', {
        auth: req.session.idi,
    });
};

exports.myOrders = async function(req, res) {
    let result;
    
    if(req.body.status == undefined || req.body.status == "") {
        result = await Order.find({user: mongoose.Types.ObjectId(req.session.idi)}).populate('status');
        console.log(result);
    } else {
        result = await Order.find({user: mongoose.Types.ObjectId(req.session.idi), status: mongoose.Types.ObjectId(req.body.status)}).populate('status');
    }
    
    res.render('myOrder.pug', {
        auth: req.session.idi, 
        orders: result,
        status: req.body.status,
    });
};

exports.deleteItemOrder = function(req, res) {
    let id = req.params.id;

    Order.remove({_id: mongoose.Types.ObjectId(id)}, function(err, result) {
        res.redirect('/repair/myOrder');
    });
};

exports.deleteOrder = function(req, res) {
    let id = req.params.id;

    Order.remove({_id: mongoose.Types.ObjectId(id)}, function(err, result) {
        res.redirect('/repair/orders');
    });
};

exports.editOrder = async function(req, res) {
    let id = req.params.id;
    
    const result = await Order.find({_id: mongoose.Types.ObjectId(id)});
    console.log(result);
    res.render('editOrder.pug', {
        auth: req.session.idi, 
        status: result[0].status,
        orderId: result[0]._id,
        orderItem: result[0].item,
        orderDescription: result[0].description,
    });

};

exports.consults = async (req, res) => {
    const result = await Consult.find();

    res.render('consult.pug', {
        auth: req.session.idi,
        consults: result
    })
}

exports.deleteConsult = async (req, res) => {
    await Consult.remove({_id: mongoose.Types.ObjectId(req.params.id)});

    res.redirect('/repair/consults');
}

exports.editOrderSave = async function(req, res) {
    if (!req.body) return res.redirect('/repair');

    let id = req.body.id;
    let item = req.body.item;
    let description = req.body.description;
    let status = req.body.status;

    await Order.findByIdAndUpdate({_id: mongoose.Types.ObjectId(id)}, {
        item: item,
        description: description,
        status: mongoose.Types.ObjectId(status),
    });

    res.redirect('/repair/orders');
}

exports.users = async function(req, res) {

    let result;
    
    if(req.body.status == undefined || req.body.status == "") {
        result = await User.find({}).populate('city');
    } else {
        result = await User.find({}).sort({surname: req.body.status}).populate('city');
    }

    res.render('users.pug', {
        auth: req.session.idi,
        users: result,
        status: req.body.status
    });
};

exports.deleteUser = async function(req, res) {
    let id = req.params.id;

    await User.remove({_id: mongoose.Types.ObjectId(id)});

    res.redirect('/repair/users');
};

exports.orders = async function(req, res) {
    let result;
    if(req.body.status == undefined || req.body.status == "") {
        result = await Order.find({}).populate({path: 'user', populate: {path: 'city'}}).populate('status');
    } else {
        result = await Order.find({status: mongoose.Types.ObjectId(req.body.status)}).populate({path: 'user', populate: {path: 'city'}}).populate('status');
    }
    res.render('orders.pug', {
        auth: req.session.idi, 
        orders: result,
        status: req.body.status,
    });
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');  
};