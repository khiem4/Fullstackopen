import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './module/phone'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    phoneService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameNumberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const checkName = persons.find(person => person.name === newName)
    const changeNumber = { ...checkName, number: newNumber }

    if (!checkName) {
      phoneService
        .create(nameNumberObject)
        .then(addPhone => {
          setSuccessMessage(`Added ${nameNumberObject.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setPersons(persons.concat(addPhone))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log(error))
    } else if (window.confirm(`${checkName.name} is already added to phonebook,
    replace the number with the new one?`)) {
      phoneService
        .update(checkName.id, changeNumber)
        .then(newNumber => {
          setPersons(persons.map(p => p.id === checkName.id ? newNumber : p))
        })
    }
  }

  const handleDelete = (id) => {
    const url = 'http://localhost:3001/persons'
    const name = persons.find(name => name.id === id)

    if (window.confirm(`Delete ${name.name}?`)) {
      axios
        .delete(`${url}/${id}`)
        .then(() => {
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

  const filterName = (event) => {
    setFilter(event.target.value)
  }
  const search = filter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h1>Phone book</h1>
      <Filter value={filter} filterName={filterName} />
      <h1>Add a new</h1>
      <Notification message={successMessage} />
      <PersonForm
        addName={addName}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h1>Numbers</h1>
      {search.map(person =>
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

const Notification = ({ message }) => {
  return (
    <div className='notifMgs'>
      <h2>
        {message}
      </h2>
    </div>
  )
}

const Filter = ({ value, filterName }) => {
  return (
    <div>
      filter show with: <input value={value} onChange={filterName} />
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