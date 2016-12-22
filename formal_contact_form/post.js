var exp = require('express');
var app = exp();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contact = require('./model');


mongoose.connect('mongodb://localhost/example');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(exp.static('web'));
app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/contacts', function(req, res) {
  console.log('getting all contacts');
  Contact.find({})
    .exec(function(err, contacts) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(contacts);
        res.json(contacts);
      }
    });
});

app.get('/contacts/:id', function(req, res) {
  console.log('getting all contacts');
  Contact.findOne({
    _id: req.params.id
    })
    .exec(function(err, contacts) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(contacts);
        res.json(contacts);
      }
    });
});
//*/
app.post('/data', function(req, res) {
  var newEntry = new Contact();

  newEntry.name = req.body.name;
  newEntry.email = req.body.email;
  newEntry.mobile = req.body.mobile;

  newEntry.save(function(err, data) {
    if(err) {
      res.send('error saving data');
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
/*
app.post('/data2', function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.delete('/book/:id', function(req, res) {
  Book.findOneAndRemove({
    _id: req.params.id
  }, function(err, book) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.status(204);
    }
  });
});
//*/
app.listen(8081, function() {
  console.log('Server running on http://localhost:' + 8081);
});