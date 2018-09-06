var express = require('express');
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var session= require('express-session');
var authentication= require('./controllers/authentication.js');
var data= require('./controllers/data.js');
var manipulate= require('./controllers/manipulate.js');

var app=express();

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));



mongoose.connect('mongodb://diaded:diaded1@ds125862.mlab.com:25862/voteapplication');

var bookSchema= mongoose.Schema({
  username: String,
  password: String,
  location: Object,
  mybooks: Array,
  youreq: Array
});

var bookdb= mongoose.model('bookdb', bookSchema);

authentication(app, bookdb);
data(app, bookdb);
manipulate(app, bookdb);




app.listen(3001, function(){
  console.log('working');
});
