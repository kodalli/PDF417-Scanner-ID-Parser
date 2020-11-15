const parseText = require('./static/parse_text.js')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.use(express.static('static'));

var parsedData;
app.get('/', (req, res) => {
    res.render('./main.ejs', 
    {parsedData : parsedData});
});

app.post('/', (req, res) => {
    let textData = req.body['licenseData'];
    parsedData = parseText.parseIdData(textData);
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`);
});
