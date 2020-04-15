// import chai from 'chai'
// // import chaiHttp from 'chai-http'
// // import server from '../index'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../dist/index')
var should = chai.should()
chai.use(chaiHttp)

// chai.request(server)
//     .post('/signIn')
//     .end((err, res) => {
//         (res).should.have.status(200)
//             (res.body).should.be.a('object')
//         done();
//     })

const assert = require('assert')
describe('Sign in test', () => {
  it('should throw error if token not generated successfully', () => {
    chai.request(server)
      .post('/signIn')
      .end((err, res) => {
        try {
          res.should.have.property('status', 200);
          (res.body).should.be.a('object')
        } catch (e) {
          throw e
        }
      })
  })
})

describe('Image thumbnail test', () => {
  it('should throw error if token not generated successfully', () => {
    chai.request(server)
      .post('/getThumbnailImage')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODY5NTkzNzIsImV4cCI6MTU4NzA0NTc3Mn0.k-mr2mWzrCKDV2y4ZFKPU7PU1gUDIpwTPPkHUicW4yQ')
      .set('Content-Type', 'application/json')
    // .send({ "url": "https://images.unsplash.com/photo-1559628129-67cf63b72248?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" })
      .end((err, res) => {
        res.should.have.property('status', 200)
      })
  })
})
