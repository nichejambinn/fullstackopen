import { useState } from 'react'

const Person = ({ person }) => 
  <div>{person.name}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.some((person) => person.name === newName)) {
      const personObject = {
        name: newName
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App