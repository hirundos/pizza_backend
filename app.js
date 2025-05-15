const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const loginRoutes = require('./routes/loginRoutes');
const menuRoutes = require('./routes/menuRoutes');
app.use('/',loginRoutes);
app.use('/',menuRoutes);

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
})