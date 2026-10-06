import { useState } from "react";
import Countries from "./components/Countries";
import countriesSevice from "./services/Countries";
import { useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState(null)

  const onSearchChange = event =>
    setSelectedCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value)
        ? country
        : null
    ))


  const onShowCountry = name =>
    setSelectedCountries(countries.filter(country =>
      country.name.common.includes(name)
        ? country
        : null
    ))
  

  useEffect(() => { 
    //note: this is wasteful, but I couldn't find an endpoint that lets you search without the full name
    // So I load all of them at the start
    countriesSevice
      .getAll()
      .then(data => setCountries(data))
  }, [])

  return (
    <>
      <div>
        find countries<input onChange={onSearchChange}/>
      </div>
      <Countries countries={selectedCountries} handleClick={onShowCountry} />
    </>
  )
}

export default App