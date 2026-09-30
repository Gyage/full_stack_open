const PersonForm = ({ newName, newNumber, addName, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>phone number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm