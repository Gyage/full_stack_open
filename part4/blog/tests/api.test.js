const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are identified with "id"', async () => {
  const response = await api.get('/api/blogs')

  assert('id' in response.body[0])
})

test('update blog', async () => {
  let blogs = await helper.blogsInDb()
  const likes = 10

  await api
    .patch(`/api/blogs/${blogs[0].id}`)
    .send({likes})
    .expect(200)

  blogs = await helper.blogsInDb()

  assert.strictEqual(blogs[0].likes, likes)
})

after(async () => {
  await mongoose.connection.close()
})