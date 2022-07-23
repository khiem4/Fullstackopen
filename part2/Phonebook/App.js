import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'arto hellas',
      number: '123456789',
      id: 1
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  console.log(persons[1])
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
      setNewName('')
      setNewNumber('')
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
      {persons.map(person =>
        <p key={person.id}> {person.name} {person.number}</p>)}
    </div >
  )
}

export default App