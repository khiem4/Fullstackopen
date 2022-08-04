import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './module/phone'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)


  useEffect(() => {
    phoneService
      .getAll()
      .then(initial => {
        setPersons(initial)
        setPersonsToShow(initial)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameNumberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const checkObject = persons.find(value => value.name === newName)
    if (!!checkObject) {
      return alert(`${newName} is already added to phonebook`)
    }

    phoneService
      .create(nameNumberObject)
      .then(addPhone => {
        setPersons(persons.concat(addPhone))
        setPersonsToShow(persons.concat(addPhone))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => console.log(error))
  }

  const filterName = (event) => {
    const filter = event.target.value
    setFilter(filter)
    setPersonsToShow(persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()
      )))
  }

  const handleDelete = (id) => {
    const url = 'http://localhost:3001/persons'
    const name = persons.find(name => name.id === id)

    if (window.confirm(`Delete ${name.name}?`)) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
          setPersonsToShow(personsToShow.filter(p => p.id !== id))
          setPersons(persons.filter(p => p.id !== id))
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }



  return (
    <div>
      <h2>Phone book</h2>
      <Filter newFilter={newFilter} filterName={filterName} />
      <h2>Add a new</h2>
      <PersonForm addName={addName}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Persons
          key={person.id}
          persons={person.name}
          number={person.number}
          handle={() => handleDelete(person.id)}
        />
      )}
    </div >
  )
}

const Filter = ({ newFilter, filterName }) => {
  return (
    <div>
      filter show with: <input value={newFilter} onChange={filterName} />
    </div>
  )
}

const Persons = ({ persons, number, handle }) => {
  return (
    <p>
      {persons} {number}
      <button onClick={handle}>
        delete</button>

    </p>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange} />
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add
        </button>
      </div>
    </form>
  )
}

export default App