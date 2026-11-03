const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const blogsRouter = require('express').Router()

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (decodedToken.id !== blog.user.toString()) {
    return response.status(403).json({ error: 'only the user who added it can delete it' })
  }

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

