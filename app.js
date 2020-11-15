import { parseIdData } from './parse_text.js';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('./main.ejs');
});

app.post('/', (req, res) => {
    //console.log(req.body);
    console.log(parseIdData(req.body.value));
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`);
});
