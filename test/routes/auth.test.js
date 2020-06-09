let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let mongoose = require('mongoose');
let storageMock = require('../storageMock')

chai.use(chaiHttp);

describe('Auth Routes', function(){

    before(async function () {
        // clear database before proforming these tests
    });

    // @desc      Request for invite
    // @route     POST /api/v1/auth/reqInvite
    // @access    Public

    describe('Request Invite', function () {

        it('Email sent to client on requesting for invite', function (done) {
            chai
              .request('http://localhost:5000/')
              .post('api/v1/auth/reqInvite')
              .set('Content-Type', 'application/json')
              .send({
                email: 'testing123@gmail.com',
                by: 'anonymous',
              })
              .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
              });
        })

    })

    // @desc      Send Invite
    // @route     PUT /api/v1/auth/sendInvite/:id
    // @access    Admin

    describe('Send Invite', function () {

        it('Admin accepts the req and email is sent', function (done) {
            chai
              .request('http://localhost:5000/')
              .put('api/v1/auth/sendInvite/testing123@gmail.com')
              .set('Content-Type', 'application/json')
              .send({
                email: 'testing@gmail.com',
                by: 'Jash',
              })
              .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
              });
        })

    })

    // @desc      Register User
    // @route     POST /api/v1/auth/register
    // @access    Public

    describe('Register User', function () {

        it('After invite, user registers himself', function (done) {
            chai
              .request('http://localhost:5000/')
              .post('api/v1/auth/register')
              .set('Content-Type', 'application/json')
              .send({
                name: 'Testing',
                email: 'testing123@gmail.com',
                password: 'testing123'
              })
              .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
              });
        })

    })

    // @desc      Login user
    // @route     POST /api/v1/auth/login
    // @access    Public

    describe('Login User', function () {

        it('User logs in after registeration', function (done) {
            chai
              .request('http://localhost:5000/')
              .post('api/v1/auth/login')
              .set('Content-Type', 'application/json')
              .send({
                email: 'testing123@gmail.com',
                password: 'testing123'
              })
              .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
              });
        })

    })

    // @desc      Get current logged in user
    // @route     POST /api/v1/auth/me
    // @access    Private

    // describe('Get user details', function () {

    //     it('Obtain details of logged in user', function (done) {
    //         chai
    //           .request('http://localhost:5000/')
    //           .get('api/v1/auth/me')
    //           .set({'Content-Type':'application/json', 'Authorization': 'Token '})
    //           .send({
    //             email: 'testing@gmail.com',
    //             password: 'testing123'
    //           })
    //           .end(function (err, res) {
    //             expect(err).to.be.null;
    //             expect(res).to.have.status(200);
    //             done();
    //           });
    //     })

    // })
})
