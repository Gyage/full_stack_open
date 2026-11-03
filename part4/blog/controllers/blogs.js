const Blog = require('../models/blog')
const User = require('../models/user')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = (await User.find({name: 'tesztAlany'}))[0]
  const data = {
    ...request.body,
    user: user._id
  }
  const blog = new Blog(data)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
    
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  blog.likes = request.body.likes

  await blog.save()
    
  response.status(200).json(blog)
})

module.exports = blogsRouter

