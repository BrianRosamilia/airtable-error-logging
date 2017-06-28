const proxyquire = require('proxyquire');
const request = require('supertest');
require('should');

let stubCalls = 0;
const airtableStub = class{
    base(){
        return function(){
            return {
                create: function(obj, cb){
                    cb();
                    stubCalls++;
                }
            };
        };
    }
};

proxyquire('../index', { airtable: airtableStub });
process.env.AIRTABLE_API_KEY = 'test'; //fake api key and endpoint are fine
process.env.AIRTABLE_BASE = 'test';
const server = require('../examples/index');

describe('airtable-error-logging', () => {
    it('responds 200 without calling error logger', done => {
        request(server)
            .get('/')
            .expect(200, () => {
                stubCalls.should.equal(0);
                done();
            });
    });

    it('responds 500 and calls logger', done => {
        request(server)
            .get('/error')
            .expect(500, () => {
                stubCalls.should.equal(1);
                done();
            });
    });
});