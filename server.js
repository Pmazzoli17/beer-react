// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Require beerDB Schema (mongo)
var Article = require('./models/Beer.js');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3005;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// MongoDB Configuration configuration
mongoose.connect('mongodb://localhost/Beer');
var db = mongoose.connection;
// mongoose.connect('mongodb://heroku_tpb1vkcz:7emirrd3920g0qif4d8d7agm3o@ds133261.mlab.com:33261/heroku_tpb1vkcz');

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});
// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/saved', function(req, res) {

  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

app.post('/api/saved', function(req, res){

  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

app.delete('/api/saved/:id', function(req, res){

  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});