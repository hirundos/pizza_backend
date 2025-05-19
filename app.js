const express = require('express');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN, 
  credentials: true
}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 //1시간
    }
}));

const loginRoutes = require('./modules/login/loginRoutes');
const menuRoutes = require('./modules/menu/menuRoutes');
const orderRoutes = require('./modules/order/orderRoutes');

app.use('/api',loginRoutes);
app.use('/api',menuRoutes);
app.use('/api',orderRoutes);

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
})