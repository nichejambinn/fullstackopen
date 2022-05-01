import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person }) => 
  <div>{person.name} {person.number}</div>

const Filter = ({ filter, handleChange }) => 
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>

const PersonForm = ({ handleSubmit, name, handleNameChange, number, handleNumberChange }) => 
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ persons }) => 
  <div>
    {persons.map(person => <Person key={person.id} person={person} />)}
  </div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [nameFilter, setNameFilter] = useState("")

  // fetch initial state of persons from server
  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    const nameToAdd = newName.trim()
    event.preventDefault()

    if (!persons.some((person) => person.name === nameToAdd)) {
      const personObject = {
        name: nameToAdd,
        number: newNumber.trim(),
        id: persons.length + 1
      }
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${nameToAdd} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} handleChange={handleNameFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App