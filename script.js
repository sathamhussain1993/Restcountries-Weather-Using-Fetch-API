const restCountriesAPI = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,latlng,cca3';
const openWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'your_api_key';

async function getCountryData() {
  const response = await fetch(restCountriesAPI);
  const countries = await response.json();
  return countries;
}

async function getWeatherData(city) {
  const response = await fetch(`${openWeatherAPI}${city}&appid=${apiKey}`);
  const weatherData = await response.json();
  return weatherData;
}

function createCard(country) {
  const column = document.createElement('div');
  column.classList.add('col-lg-4', 'col-sm-12');

  const card = document.createElement('div');
  card.classList.add('card');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  const countryName = document.createElement('h1');
  countryName.classList.add('text-center');
  countryName.textContent = country.name.common;
  cardHeader.appendChild(countryName);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const flagImg = document.createElement('img');
  flagImg.classList.add('card-img-top');
  flagImg.src = country.flags.png;
  cardBody.appendChild(flagImg);

  const cardText = document.createElement('div');
  cardText.classList.add('card-text');

  const region = document.createElement('p');
  region.textContent = `Region: ${country.region}`;
  cardText.appendChild(region);

  const capital = document.createElement('p');
  capital.textContent = `Capital: ${country.capital[0]}`;
  cardText.appendChild(capital);

  const latLong = document.createElement('p');
  latLong.textContent = `Latitude Longitude: ${country.latlng}`;
  cardText.appendChild(latLong);

  const countryCode = document.createElement('p');
  countryCode.textContent = `Country Code: ${country.cca3}`;
  cardText.appendChild(countryCode);

  cardBody.appendChild(cardText);

  const weatherBtn = document.createElement('button');
  weatherBtn.classList.add('btn', 'btn-primary');
  weatherBtn.textContent = 'Click for Weather';

  weatherBtn.addEventListener('click', async () => {
    try {
      const weatherData = await getWeatherData(country.capital[0]);
      alert(`Current temperature in ${country.capital[0]} is ${weatherData.main.temp} Kelvin`);
    } catch (error) {
      console.error(error);
    }
  });

  cardBody.appendChild(weatherBtn);

  card.append(cardHeader, cardBody);
  column.appendChild(card);

  return column;
}

async function main() {
  try {
    const countriesData = await getCountryData();
    countriesData.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.classList.add('container');

    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < countriesData.length; i++) {
      const card = createCard(countriesData[i]);
      row.appendChild(card);
    }

    cardContainer.appendChild(row);

  } catch (error) {
    console.error(error);
  }
}

main();
