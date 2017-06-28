# airtable-error-logging

Log to an Airtable table when there's an unhandled exception.  Supported as an Express.js middleware.

## Usage

`npm install airtable-error-logging --save`

```
const app = express();
const airTableLogging = require('airtable-error-logging')({apiKey: 'gtahfetE31', base: 'appy0tae31'});
app.use(airTableLogging.middleware);

app.get('/', function(req, res){
	res.send('Hello World!');
});

app.get('/error', function(req, res){
    //Going to this route will cause a row to be inserted into your Airtable `Error` table
	throw new Error('This is an error');
});

app.listen(3000, function(e){
	if(e !== undefined){
		console.error(e);
	}
	console.log('App listening on port 3000!');
});
```

(Runnable examples in /examples and /tests)

## Setup

Create a table in Airtable with the following structure

| Column Name: | Time  | Stacktrace | Message  | Parameters | Headers |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| Data Type: | Time  | Single Line/Long Text  | Single Line/Long Text  | Single Line/Long Text  | Single Line/Long Text |


## Object Parameter Key/Values

* `apiKey` your Airtable API key.  Found at https://airtable.com/account
* `base` the current base which contains the table you wish to log the error to.
* `table` the name of the table you wish to log errors to.  Must follow the schema outlined in [setup](#setup)

## Notes

This package is not an Official Airtable package