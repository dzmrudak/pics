const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const path = require('path');
const fs = require('fs');
const app = require('../../server');

chai.use(chaiHttp);

describe('Server Test', function () {
    it('server is live', function (done) {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('GET /random-picture', function () {

    it('should respond with a 200 status code and a picture', function (done) {
        chai.request(app)
            .get('/random-picture')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', /^image\/.*/);
                expect(res.body).to.be.an.instanceOf(Buffer);
                done();
            });
    });

    it('should return an error message if the img folder does not exist', function (done) {
        const picturesFolder = path.join(__dirname, '../../img');
        fs.renameSync(picturesFolder, picturesFolder + '_temp');

        chai.request(app)
            .get('/random-picture')
            .end(function (err, res) {
                expect(res).to.have.status(404)
                expect(res.text).to.equal('Folder has not been found')
                fs.renameSync(picturesFolder + '_temp', picturesFolder);
                done();
            });

    });

    it('should return an error message if no pictures found', function (done) {

        const picturesFolder = path.join(__dirname, '../../img');
        fs.renameSync(picturesFolder, picturesFolder + '_temp');
        fs.mkdirSync(picturesFolder);

        chai.request(app)
            .get('/random-picture')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('No pictures found in the folder');
                fs.rmdirSync(picturesFolder);
                fs.renameSync(picturesFolder + '_temp', picturesFolder);
                done();
            });
    });
});

describe('POST /picture', function () {

    it('should return a picture with the name from a body when the search field submitted', function (done) {
        const body = {
            "pictureName": "1.png"
        };
        chai.request(app)
            .post('/picture')
            .set('content-type', 'application/json')
            .send(body)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.type).to.include('image');
                done();
            });
    });

    it('should return an error message if picture name is not provided', function (done) {
        const body = {
            pictureName: ''
        };
        chai.request(app)
            .post('/picture')
            .set('content-type', 'application/json')
            .send(body)
            .end(function (err, res) {
                expect(res).to.have.status(500);
                expect(res.body.error).to.equal('Picture name is required');
                done();
            });
    });

    it('should return an error message if picture is not found', function (done) {
        const body = {
            pictureName: 'invalid.png'
        };
        chai.request(app)
            .post('/picture')
            .set('content-type', 'application/json')
            .send(body)
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.body.error).to.equal('Picture not found');
                done();
            });
    });
}); 