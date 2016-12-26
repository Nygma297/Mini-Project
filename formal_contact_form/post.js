var exp = require('express');
var app = exp();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contact = require('./model'); 
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');

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
  var temp = Contact.find({})
    .exec(function(err, contacts) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(contacts);
        res.render('y', {temp: contacts} );
        
      }
    });
});



app.get('/contacts2', function(req, res) {
  console.log('Removing the specified contact!');
  Contact.findOne({ name: req.body.name}, function(err, data){
    if(err){
      return console.error(err);
    }else{
      Conatct.remove(function(err){
        if(err){
          return console.error(err);
        }
      })
    }
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

  var x = newEntry.name = req.body.name;
  var y = newEntry.email = req.body.email;
  var z = newEntry.mobile = req.body.mobile;

  newEntry.save(function(err, data) {
    if(err) {
      res.send('error saving data');
    } else {
      console.log(data);
    }
  var data = {
    name: x, email: y, mobile: z
  };
  res.render('x', data);
});

})

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
//*/

app.put('/up', function(req, res){
	Contact.findOneAndUpdate({name: req.params.name}, {$set:{name:req.body.n_name, email: req.body.email, mobile: req.body.mobile}}, {upsert:false}, function(err, data){
			if(err){
				console.log('Error Encountered!');
			}else{
				console.log(data);
        res.render('w')
				res.send(204);
			}
	})
}) 

app.delete('/del', function(req, res) {
  var x = req.query.name;
  console.log(x);
  Contact.findOneAndRemove({x}, function(err, data) {
    if(err) {
      res.send('error removing')
    } else {
      res.render('z', {name:x});
    }
  });
});
//*/

app.listen(8081, function() {
  console.log('Server running on http://localhost:' + 8081);
});