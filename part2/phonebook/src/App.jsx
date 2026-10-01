import { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const personWithThisName = persons.find(person => person.name === newName)

    if (personWithThisName) {
      handleExistingPerson(newName, newNumber, personWithThisName)
    } else {
      handleCreate(newName, newNumber)
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(() => setPersons(persons.filter(existingPerson => existingPerson.id !== person.id)))
    }
  }

  const handleExistingPerson = (name, newNumber, personWithThisName) => {
    if (!window.confirm(`${name} is already added to phonebook, replace the old number with the new one?`)) {
      return;
    }
    const newPerson = { ...personWithThisName, number: newNumber }

    personsService
      .update(personWithThisName.id, newPerson)
      .then(personData => {
        setPersons(persons.map(person => person.id === personData.id ? personData : person))
      })
  }

  const handleCreate = (newName, newNumber) => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(newPerson)
      .then(personData => {
        alert(`${personData.name} added to phonebook`)
        newPerson.id = personData.id
        setPersons(persons.concat(newPerson))
      })
  }

  const filteredPersons = searchTerm === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm))

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => setPersons(personsData))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleFilterChange={handleSearchTermChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName} 
        newNumber={newNumber} 
        handleSubmit={handleSubmit} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <Numbers 
        persons={filteredPersons} 
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App