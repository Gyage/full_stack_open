const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('new user inserted', async () => {
  const usersOriginally = (await helper.usersInDb()).length

  const newUser = {
    username: 'MrME2',
    name: 'ME2',
    password: 'localhost',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const users = (await helper.usersInDb()).length

  assert.strictEqual(users, usersOriginally + 1)
})

test('new user missing username', async () => {
  const newUser = {
    name: 'ME2',
    password: 'localhost',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect(function(res) {
      assert(res.body.hasOwnProperty('error'));
      assert(res.body.error.includes('User validation failed: username: Path `username` is required.'));
    })
    
})

test('new user not unique username', async () => {
  const newUser = {
    username: 'JonnieX',
    name: 'John',
    password: 'xy.zy',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect(function(res) {
      assert(res.body.hasOwnProperty('error'));
      assert(res.body.error.includes('expected `username` to be unique'));
    })
})

after(async () => {
  await mongoose.connection.close()
})