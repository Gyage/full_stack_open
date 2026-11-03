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
  const saltRounds = 10
  await User.deleteMany({})
  // const userData = helper.initialUsers.map(async user => { 
  //   const hash = await bcrypt.hash(password, saltRounds)
  //   return { ...user, password: hash } 
  // })

  const users = await User.insertMany(helper.initialUsers)

  const blogData = helper.initialBlogs.map(blog => { return { ...blog, user: users[0]._id.toString() } })
  await Blog.deleteMany({})
  const blogs = await Blog.insertMany(blogData)

  users[0].blogs = blogs
})

const getToken = async (loginCredentials) => {
  loginCredentials = loginCredentials 
    ? loginCredentials
    : {
      username: 'JonnieX',
      password: 'password'
    }

  const response = await api
    .post('/api/login')
    .send(loginCredentials)

  return response.body.token
}

test('new blog inserted', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'ME',
    url: 'localhost:3000',
    likes: 3
  }
  const token = await getToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()
  delete blogs[blogs.length - 1].id
  delete blogs[blogs.length - 1].user

  assert.deepStrictEqual(newBlog, blogs[blogs.length - 1])
})

test('new blog without login', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'ME',
    url: 'localhost:3000',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect(function(res) {
      assert(res.body.hasOwnProperty('error'));
      assert(res.body.error.includes('token invalid'));
    })
})

test('new blog default likes 0', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'ME',
    url: 'localhost:3000',
  }
  const token = await getToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()
  delete blogs[blogs.length - 1].id

  assert.strictEqual(0, blogs[blogs.length - 1]['likes'])
})

test('new blog missing title', async () => {
  const newBlog = {
    author: 'ME',
    url: 'localhost:3000',
    likes: 1,
  }
  const token = await getToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('new blog missing url', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'ME',
    likes: 1,
  }
  const token = await getToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('delete blog', async () => {
  let blogs = await helper.blogsInDb()
  const token = await getToken()

  await api
    .delete(`/api/blogs/${blogs[0].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  blogs = await helper.blogsInDb()

  assert.strictEqual(blogs.length, helper.initialBlogs.length - 1)
})

test('delete blog bad login', async () => {
  let blogs = await helper.blogsInDb()
  const token = await getToken({ username: 'MrME', password: 'password'})


  await api
    .delete(`/api/blogs/${blogs[0].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(403)
    .expect(function(res) {
      assert(res.body.hasOwnProperty('error'));
      assert(res.body.error.includes('only the user who added it can delete it'));
    })
})

after(async () => {
  await mongoose.connection.close()
})