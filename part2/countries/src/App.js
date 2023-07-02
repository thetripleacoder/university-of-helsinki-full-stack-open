import countryService from './services/countries';
import weatherService from './services/weather';
import { useEffect, useState } from 'react';

function App() {
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    countryService.getAll().then((response) => {
      let data = response.data;
      setAllCountries(data);
    });
  }, []);

  function searchCountry(query) {
    let lowercasedQuery = query.toLowerCase();
    setSearchQuery(lowercasedQuery);
    let filteredCountries = allCountries.filter((country) => {
      let lowercasedCountryName = country.name.common.toLowerCase();
      return lowercasedCountryName.includes(lowercasedQuery);
    });
    setSearchedCountries(filteredCountries);
    if (filteredCountries.length === 1) {
      searchWeatherData(filteredCountries[0].name.common)
        .then((response) => {
          if (response.status === 200) {
            setWeatherData(response.data);
            setCountryDetails(filteredCountries[0]);
            setIsShowDetails(true);
          }
        })
        .catch((error) => setIsShowDetails(false));
    } else {
      setIsShowDetails(false);
    }
  }

  function searchWeatherData(country) {
    return weatherService.searchWeatherData(country);
  }

  function showCountryDetails(country) {
    setCountryDetails(country);
    setIsShowDetails(true);
  }

  if (!allCountries) {
    return null;
  }

  return (
    <div className='App'>
      <span>find countries</span>
      <input
        value={searchQuery}
        onChange={(e) => searchCountry(e.target.value)}
      ></input>
      <div>
        {searchedCountries.length <= 10 ? (
          !isShowDetails ? (
            searchedCountries.map((country) => {
              return (
                <p key={country.name.common}>
                  <span>{country.name.common}</span>
                  <button onClick={() => showCountryDetails(country)}>
                    show
                  </button>
                </p>
              );
            })
          ) : (
            <div key={countryDetails.name.common}>
              <h1>{countryDetails.name.common}</h1>
              <div>
                <p>capital {countryDetails.capital[0]}</p>
                <p>area {countryDetails.area}</p>
              </div>
              <h3>languages:</h3>
              <div>
                <ul>
                  {Object.keys(countryDetails.languages).map((key) => {
                    return <li key={key}>{countryDetails.languages[key]}</li>;
                  })}
                </ul>
              </div>
              <h2>Weather in Helsinki</h2>
              <p>temperature {weatherData.main.temp}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt=''
              ></img>
              <p>wind {weatherData.wind.speed} m/s</p>
            </div>
          )
        ) : searchQuery ? (
          <p>Too many matches, specify another filter</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
