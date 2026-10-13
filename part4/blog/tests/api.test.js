const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
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

test('new blog inserted', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'ME',
    url: 'localhost:3000',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()
  delete blogs[blogs.length - 1].id

  assert.deepStrictEqual(newBlog, blogs[blogs.length - 1])
})

after(async () => {
  await mongoose.connection.close()
})