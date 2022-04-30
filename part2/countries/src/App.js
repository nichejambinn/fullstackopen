import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false)
  const handleClick = () => setShowCountry(true)

  return (
    <>
      {showCountry 
        ? <CountryDetails country={country} />
        : <div>{country.name.common} <button onClick={handleClick}>show</button></div>
      }
    </>
  )
}

const CountryDetails = ({ country }) =>
  <div>
    <h1>{country.name.common}</h1>
    <div>
      capital {country.capital}<br />
      area {country.area}
    </div>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map(language =>
        <li key={language}>
          {language}
        </li>
      )}
    </ul>
    <img src={country.flags.png} alt="country flag" width={150} />
  </div>

const Countries = ({ countries }) =>
  <div>
    {countries.length > 10
      ? "Too many matches, specify another filter"
      : countries.length === 1
        ? <CountryDetails country={countries[0]} />
        : countries.map(country => 
            <Country key={country.name.common} country={country} />
          )
    }
  </div>

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")

  // get all countries
  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(`response contains ${response.data.length} records`)
      setCountries(response.data)
    })
  }, [])

  const handleCountryFilterChange = (event) => {
    console.log(`country filter: ${event.target.value}`)
    setCountryFilter(event.target.value)
  }

  const countriesFiltered = countryFilter === "" 
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.trim().toLowerCase()))

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryFilterChange} />
      <Countries countries={countriesFiltered} />
    </div>
  )
}

export default App;
