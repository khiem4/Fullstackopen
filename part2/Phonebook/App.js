import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [personsToShow, setPersonToShow] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameNumberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const checkObject = persons.find(value => value.name === newName || value.number === newNumber)
    if (!!checkObject) {
      return alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameNumberObject))
      setPersonToShow(persons.concat(nameNumberObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const filterName = (event) => {
    const filter = event.target.value
    setFilter(filter)
    setPersonToShow(persons.filter(person =>
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
      <div>
        filter show with: <input value={newFilter} onChange={filterName} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <p key={person.id}> {person.name} {person.number}</p>)}
    </div >
  )
}




export default App