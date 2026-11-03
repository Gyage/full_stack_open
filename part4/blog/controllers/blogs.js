const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  const data = {
    ...request.body,
    user: user._id.toString()
  }
  const blog = new Blog(data)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'only the user who added it can delete it' })
  }

  blogIndex = user.blogs.indexOf(blog._id)
  user.blogs.splice(blogIndex, 1)
  await user.save()

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

