const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String,
})

personSchema.path('number').validate(function(value) {
  return value.length > 7
}, 'The number must be at least 8 characters long')

personSchema.path('number').validate(function(value) {
  const parts = value.split('-')
  return parts.length > 1
    && /^\d{2,3}$/.test(parts[0])
    && /^\d+$/.test(parts[1])
}, 'The number must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers')


personSchema.static('getAll', function () {
  return this.find({})
})

personSchema.static('create', function (data) {
  return (new this(data)).save({ runValidators: true })
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)