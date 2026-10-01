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

  const addName = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

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
        .then(data => setPersons(persons.filter(existingPerson => existingPerson.id !== person.id)))
    }
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
        addName={addName} 
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