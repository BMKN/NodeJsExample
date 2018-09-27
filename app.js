var express = require('express');
var toDoControler = require('./controllers/todoController')
var app = express();
//Template engine
app.set('view engine','ejs');

app.use(express.static('./assets'));

toDoControler(app);

//Setting up the port to run application
app.listen(3000);

console.log('Port 3000');