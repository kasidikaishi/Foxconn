// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

function fetchData() {
  fetch('https://api.openbrewerydb.org/breweries')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const html = `
        <div>
          <h1 id="breweries-list">Breweries List</h1>
          <label htmlFor="cityFilter">City</label>
          <select id="cityFilter" name="cityFilter">
            <option value="AllCity">All</option>
            <option value="San Diego">San Diego</option>
            <option value="Knox">Knox</option>
            <option value="Bend">Bend</option>
            <option value="Boise">Boise</option>
            <option value="Demver">Denver</option>
            <option value="Porland">Porland</option>
            <option value="Reno">Reno</option>
            <option value="Quilcene">Quilcene</option>
            <option value="Petaluma">Petaluma</option>
            <option value="CastleRock">Castle Rock</option>
            <option value="Anoka">Anoka</option>
            <option value="Abington">Abington</option>
            <option value="Houston">Houston</option>
            <option value="JohnDay">John Day</option>
            <option value="Killeshin">Killeshin</option>
            <option value="Williamsville">Williamsville</option>
            <option value="Gilbert">Gilbert</option>
            <option value="Mesa">Mesa</option>
          </select>
          <label htmlFor="typeFilter">Type</label>
          <select id="typeFilter" name="typeFilter">
            <option value="AllType">All</option>
            <option value="micro">micro</option>
            <option value="large">large</option>
            <option value="brewpub">brewpub</option>
            <option value="closed">closed</option>
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
      <div>There is no brewery matching the selection</div>
    `
  }
  return data
  .map(element => {
    let phone = element.phone;
    return `
      <div class="container">
        <div class="name">Name: ${element.name}</div>
        <div class="type">Brewery Type: ${element.brewery_type}</div>
        <div class="street">Street: ${element.street ? element.street : ''}</div>
        <div class="phone">Phone: ${element.phone ? phone : ''}</div>
        <div class="website">Website: ${element.website_url ? element.website_url : ''}</div>
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
