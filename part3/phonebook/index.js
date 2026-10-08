require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) { 
  return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 

app.get('/info', (request, response) => {
  response.send(`
    <div>Phonebook has info of ${persons.length} people</div>
    <div>${new Date()}</div>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    response.status(404).end()
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person
    .getAll()
    .then(persons => response.json(persons))
})

app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    return response.status(400).json({error: 'the person must have a name and a number'})
  }

  if (persons.find(person => person.name === name)) {
    return response.status(400).json({error: 'the name must be unique'})
  }

  (Person.create({name, number}))
    .then(savedPerson => {
      response.json(savedPerson)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error)

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)