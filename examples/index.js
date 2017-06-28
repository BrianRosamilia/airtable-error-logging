const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const airtableError = require('../index')({});

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.get('/error', function(req, res){
	throw new Error('This is an error');
});

app.use(airtableError.middleware);

app.use(function(err, req, res, next){
	res.status(500).send('Uh oh');
});

module.exports = app.listen(3000, function(e){
	if(e !== undefined){
		console.error(e);
	}
	console.log('App listening on port 3000!');
});