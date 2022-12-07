// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

function fetchData() {
  fetch('https://api.openbrewerydb.org/breweries')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const cityMap = new Map();
      const typeMap = new Map();
      let cityOptions = '';
      let typeOptions = '';
      for (let element of data) {
        if (!cityMap.has(element.city)) {
          cityMap.set(element.city, true);
          cityOptions += `<option value=${element.city}>${element.city}</option>`
        }
        if (!typeMap.has(element.brewery_type)) {
          typeMap.set(element.brewery_type, true);
          typeOptions += `<option value=${element.brewery_type}>${element.brewery_type}</option>`
        }
      }

      const html = `
        <div id="container">
          <h1 id="breweries-list">Breweries List</h1>
          <label htmlFor="cityFilter">City</label>
          <select id="cityFilter" name="cityFilter">
            <option value="AllCity">All</option>
            ${cityOptions}
          </select>
          <label htmlFor="typeFilter">Type</label>
          <select id="typeFilter" name="typeFilter">
            <option value="AllType">All</option>
            ${typeOptions}
          </select>
          <button id="submitButton" type="submit">Submit</button>
          <div id="allBreweriesList"></div>
        </div>
        `

        document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
        const breweriesList = document.getElementById('allBreweriesList');
        breweriesList.innerHTML = allBreweries(data);

        const breweries = document.getElementById('submitButton');
        breweries.addEventListener("click", (event) => filterBreweries(event, data));
    })
    .catch(error => {
      console.log(error);
    })
}

function allBreweries(data) {
  if (data.length === 0) {
    return `
      <div id="emptySelect">There is no brewery matching the selection</div>
    `
  }
  return data
  .map(element => {
    let phone = element.phone;
    if (element.phone !== null) {
      phone = element.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return `
      <div class="card">
        <div id="name">Name: ${element.name}</div>
        <div id="type">Brewery Type: ${element.brewery_type}</div>
        <div id="street">Street: ${element.street ? element.street : ''}</div>
        <div id="phone">Phone: ${element.phone ? phone : ''}</div>
        <div id="website">Website: ${element.website_url ? element.website_url : ''}</div>
      </div>
    `
  })
  .join('');
}

function filterBreweries(event, data) {
  const citySelectValue = document.getElementById('cityFilter').value;
  const typeSelectValue = document.getElementById('typeFilter').value;
  let breweriesFilter = [];
  if (citySelectValue !== 'AllCity' && typeSelectValue !== 'AllType') {
    breweriesFilter = data.filter(element => element.city === citySelectValue && element.brewery_type === typeSelectValue);
  } else if (citySelectValue !== 'AllCity') {
    breweriesFilter = data.filter(element => element.city === citySelectValue);
  } else if (typeSelectValue !== 'AllType') {
    breweriesFilter = data.filter(element => element.brewery_type === typeSelectValue);
  } else {
    breweriesFilter = data;
  }

  const breweriesList = document.getElementById('allBreweriesList');
  if (event.target.tagName === 'BUTTON') {
    breweriesList.innerHTML = allBreweries(breweriesFilter)
  } else {
    breweriesList.innerHTML = allBreweries(data)
  }
}

fetchData();
