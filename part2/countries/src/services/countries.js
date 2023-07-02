import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = () => {
  const request = axios.get(baseUrl + 'all');
  return request;
};

const searchCountry = (country) => {
  const request = axios.get(baseUrl + '/name/' + country);
  return request;
};

export default { getAll, searchCountry };
