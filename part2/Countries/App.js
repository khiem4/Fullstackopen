import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [nameCountries, setNameCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [countryToShow, setCountryToShow] = useState(nameCountries)
  const [countryInfo, setCountryInfo] = useState(nameCountries)


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryToShow(response.data)
        setNameCountries(response.data)
      })
  }, [])


  const handleFilter = (event) => {
    const filter = event.target.value
    const filterLowerCase = filterCountry.toLowerCase()
    setFilterCountry(filter)
    setCountryToShow(nameCountries
      .filter(country =>
        country.name.common.toLowerCase().startsWith(filterLowerCase))
    )
  }


  return (
    <div>
      find countries <input value={filterCountry} onChange={handleFilter}
      />
      <Countries countryToShow={countryToShow} />
    </div >
  )
}

const Countries = ({ countryToShow }) => {
  let languagesCounter = 1
  let countryCounter = 1
  if (countryToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countryToShow.length === 1) {
    return (
      <div>
        <h1>{countryToShow[0].name.common}</h1>
        <p>capital {countryToShow[0].capital}</p>
        <p>area {countryToShow[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(countryToShow[0].languages)
            .map(languages =>
              <li key={languagesCounter++}>{languages}</li>)}
        </ul>
        <img src={countryToShow[0].flags.png} alt='flag' ></img>
      </div>
    )
  }
  return (
    <>{
      countryToShow.map(country =>
        <h3 key={countryCounter++}> {country.name.common} </h3>)
    }
    </>
  )
}



export default App  