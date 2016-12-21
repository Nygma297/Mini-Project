var exp = require('express');
var app = exp();

app.use(exp.static('web'));
app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/' + 'index.html');
});

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.get('/process_get', urlencodedParser, function(req, res){
	re = {
		First_Name:req.query.fn,
		Contact_Nummber:req.query.cn,
		Email_ID:req.query.mail,
	};
    console.log('The Data received is:');
	console.log(re);
	res.end(JSON.stringify(re));
})
var serv = app.listen(8081, function(){
		console.log('Application running at address http://localhost:%s',serv.address().post);
})