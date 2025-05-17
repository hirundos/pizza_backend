const express = require('express');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:5500', 
  credentials: true
}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 //1시간
    }
}));

const loginRoutes = require('./routes/loginRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/',loginRoutes);
app.use('/',menuRoutes);
app.use('/',orderRoutes);

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
})