import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => 
  <div>
    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
  </div>

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

const Persons = ({ persons, deletePerson }) => 
  <div>
    {persons.map(person => 
      <Person 
        key={person.id} 
        person={person} 
        deletePerson={() => deletePerson(person.id)} 
      />
    )}
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
    const person = persons.find(p => p.name === nameToAdd)
    event.preventDefault()

    if (!person) {
      // once we can delete using persons array length causes unique id errors on server
      const maxId = persons.reduce((max, person) =>
        person.id > max ? person.id : max, 0)

      const personObject = {
        name: nameToAdd,
        number: newNumber.trim(),
        id: maxId + 1
      }
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      if (window.confirm(`${nameToAdd} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumberOf(person.id)
      }
    }
  }

  const updateNumberOf = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = { 
      ...person, 
      number: newNumber.trim() 
    }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        console.log(`number of ${returnedPerson.name} updated`)
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(responseStatus => {
          console.log(responseStatus === 200 ? `${person.name} deleted` : `delete unsuccessful`)

          setPersons(persons.filter(person => person.id !== id))
        })
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App