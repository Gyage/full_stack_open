import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getWeatherForCity = cityName => {
  return axios
    .get(`${baseUrl}?q=${cityName}&apiKey=${api_key}&units=metric`)
    .then(response => response.data)
}

export default { getWeatherForCity }