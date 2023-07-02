import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = process.env.REACT_APP_API_KEY;

const searchWeatherData = (country) => {
  const request = axios.get(baseUrl + country + '&appid=' + apiKey);
  return request;
};

export default { searchWeatherData };
