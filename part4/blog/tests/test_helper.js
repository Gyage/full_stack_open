const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John',
    url: 'xy.zy',
    likes: 1
  },
  {
    title: 'Node is easy',
    author: 'ME',
    url: 'localhost',
    likes: 1000
  },
]

const initialUsers = [
  {
    username: 'JonnieX',
    name: 'John',
    password: 'xy.zy',
  },
  {
    username: 'MrME',
    name: 'ME',
    password: 'localhost',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}