import { useEffect, useState } from "react";
import weatherSevice from "../services/Weather";

const Countries = ({ countries, handleClick }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!countries || countries.length !== 1) {
      return
    }
    weatherSevice
      .getWeatherForCity(countries[0].name.common)
      .then(data => setWeather(data))
      .catch(response => console.log(response));
    }, [countries])

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
    const weatherElement = weather 
      ? <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      : null

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
        {weatherElement}
      </>
    )
  }
}

export default Countries