import React from 'react'

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

export default Person
export {
  Filter,
  PersonForm,
  Persons
}