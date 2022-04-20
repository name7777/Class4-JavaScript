const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

app.use('/', router);

const port = 3000;
app.listen(port, () => console.log(`Server On`));