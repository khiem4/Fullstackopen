import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
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
    axios
      .post('http://localhost:3001/persons', nameNumberObject)
      .then(add => {
        setPersons(persons.concat(nameNumberObject))
        setPersonsToShow(persons.concat(nameNumberObject))
        setNewName('')
        setNewNumber('')
      })


  }

  const filterName = (event) => {
    const filter = event.target.value
    setFilter(filter)
    setPersonsToShow(persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()
      )))
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
      <Persons personsToShow={personsToShow} />
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

const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map(person =>
        <p key={person.id}> {person.name} {person.number}</p>)}
    </>
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