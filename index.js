const assert = require('assert');
const Airtable = require('airtable');

const fn = ({apiKey, base, table}) => {
	apiKey = process.env.AIRTABLE_API_KEY || apiKey;
	base = process.env.AIRTABLE_BASE || base;
	table = table || 'Errors';

	assert(apiKey, 'API key is required for Airtable middleware');
	assert(base, 'Base is required for Airtable middleware');

	const at = new Airtable({apiKey}).base(base);

	return {
        middleware: function(err, req, res, next){
                next(err); //Don't wait for logging
                at(table).create({
                    Time: new Date(),
                    Stacktrace: err.stack,
                    Message: err.message,
                    Parameters: JSON.stringify(req.params),
                    Headers: JSON.stringify(req.headers) }, function(error){
                    if(error){
                        console.error(error);
                    }
                });
            }
	};
};

module.exports = fn;