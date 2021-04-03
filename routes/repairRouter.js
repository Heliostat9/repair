const express = require('express');
const repairController = require('../controllers/repairController');
const repairRouter = express.Router();


repairRouter.post('/users', repairController.users);
repairRouter.get('/delUser/:id', repairController.deleteUser);
repairRouter.get('/users', repairController.users);
repairRouter.get('/logout', repairController.logout);
repairRouter.get('/myOrder', repairController.myOrders);
repairRouter.post('/myOrder', repairController.myOrders);
repairRouter.get('/orders', repairController.orders);
repairRouter.post('/orders', repairController.orders);
repairRouter.get('/delItem/:id', repairController.deleteItemOrder);
repairRouter.get('/del/:id', repairController.deleteOrder);
repairRouter.post('/edit/:id', repairController.editOrderSave);
repairRouter.get('/edit/:id', repairController.editOrder);
repairRouter.post('/addOrder', repairController.addOrderCheck);
repairRouter.get('/addOrder', repairController.addOrder);
repairRouter.get('/', repairController.main);

module.exports = repairRouter;