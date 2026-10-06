const Countries = ({ countries, handleClick }) => {
  if (countries === null || countries.length === 0 || countries.length > 10) {
    return (
      <div>
        Too many matches, specify further
      </div>
    )
  } else if (countries.length > 1) {
    const countryNames = countries.map(country => 
      <div key={country.cca3}>
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>Show</button>
      </div>
    )

    return (countryNames)
  } else {
    const country = countries[0]
    const languages = Object.keys(country.languages).map((key) => country.languages[key])
    const languageList = languages.map((language, index) => <li key={index}>{language}</li>)

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languageList}
        </ul>
        <img 
          src={country.flags.png} 
          width={100}
          height={100} />
      </>
    )
  }
}

export default Countries