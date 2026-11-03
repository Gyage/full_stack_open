const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, author: 1, id: 1 })
  
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password : passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// usersRouter.delete('/:id', async (request, response) => {
//   await Blog.findByIdAndDelete(request.params.id)
    
//   response.status(204).end()
// })

// usersRouter.patch('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)

//   blog.likes = request.body.likes

//   await blog.save()
    
//   response.status(200).json(blog)
// })

module.exports = usersRouter

