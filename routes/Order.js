const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrders, fetchAdminOrders } = require('../controller/Order');

const router = express.Router();

router.post('/', createOrder)
      .get('/user/:userId', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/',fetchAllOrders)
      .get('/admin',fetchAdminOrders)


exports.router = router;