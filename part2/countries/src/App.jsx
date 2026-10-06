import { useState } from "react";
import Countries from "./components/Countries";
import countriesSevice from "./services/Countries";
import { useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState(null)

  const onSearchChange = event => {
    setSelectedCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value)
        ? country
        : null
    ))
  }

  useEffect(() => { 
    countriesSevice
      .getAll()
      .then(data => setCountries(data))
  }, [])

  return (
    <>
      <div>
        find countries<input onChange={onSearchChange}/>
      </div>
      <Countries countries={selectedCountries} />
    </>
  )
}

export default App