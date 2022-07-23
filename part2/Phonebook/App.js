import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1
    }
  ])
  const [newName, setNewName] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }
    const checkObject = persons.find(value => value.name === newName)
    if (!!checkObject) {
      return alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }



  return (
    <div>
      <h2>Phone book</h2>
      <form onSubmit={addName}>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
        <div>
          <button type="submit">add </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name =>
        <p key={name.id}> {name.name}</p>)}
    </div >
  )
}

export default App