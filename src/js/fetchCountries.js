function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${countryName}`,
  ).then(res => res.json());
}

export default fetchCountries;
