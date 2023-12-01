const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const usersRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');
const { User } = require('./model/User');
const { isAuth, sanitizeUser } = require('./services/common');


server.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
server.use(express.json()); 
server.use('/products',  productsRouter.router);

server.use('/categories',  categoriesRouter.router);

server.use('/users',  usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',  cartRouter.router);
server.use('/orders',  ordersRouter.router);


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/online');
  console.log('database connected');
}

server.listen(8080, () => {
  console.log('server started');
});
