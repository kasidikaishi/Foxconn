// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

function fetchData() {
  fetch('https://api.openbrewerydb.org/breweries')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('...', data);
      const html = `
        <div>
          <h1 id="breweries-list">Breweries List</h1>
          <label htmlFor="cityFilter">City</label>
          <select id="cityFilter" name="cityFilter">
            <option value="AllCity">All</option>
            <option value="SanDiego">San Diego</option>
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
          <div class="allBreweriesList"></div>
        </div>
        `
        document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
        const breweries = document.getElementById('submitButton');
        const allBreweries = document.getElementsByClassName('allBreweriesList');
        breweries.addEventListener("click", (event) => {
          allBreweries.innerHTML = filterBreweries(event, data)
        });
    })
    .catch(error => {
      console.log(error);
    })
}

function filterBreweries(event, data) {
  const allBreweries = data.map(element => {
    return `
      <div>
        <div>Name: ${element.name}</div>
        <div>Brewery Type: ${element.brewery_type}</div>
        <div>Street: ${element.street ? element.street : ''}</div>
        <div>Phone: ${element.phone ? element.phone : ''}</div>
        <div>Website: ${element.website_url ? element.website_url : ''}</div>
      </div>
    `
  })
  const citySelectValue = document.getElementById('cityFilter');
  const typeSelectValue = document.getElementById('typeFilter');
  const breweriesFilter = data.filter(element => {
    if (citySelectValue === 'All' && typeSelectValue === 'All') {
      return `
        <div>
          <div>Name: ${element.name}</div>
          <div>Brewery Type: ${element.brewery_type}</div>
          <div>Street: ${element.street ? element.street : ''}</div>
          <div>Phone: ${element.phone ? element.phone : ''}</div>
          <div>Website: ${element.website_url ? element.website_url : ''}</div>
        </div>
      `
    }
    else if (citySelectValue === 'All' && element.brewery_type === typeSelectValue) {
      return `
      <div>
        <div>Name: ${element.name}</div>
        <div>Brewery Type: ${element.brewery_type}</div>
        <div>Street: ${element.street ? element.street : ''}</div>
        <div>Phone: ${element.phone ? element.phone : ''}</div>
        <div>Website: ${element.website_url ? element.website_url : ''}</div>
      </div>
      `
    }
    else if (typeSelectValue === 'All' && element.city === citySelectValue) {
      return `
      <div>
        <div>Name: ${element.name}</div>
        <div>Brewery Type: ${element.brewery_type}</div>
        <div>Street: ${element.street ? element.street : ''}</div>
        <div>Phone: ${element.phone ? element.phone : ''}</div>
        <div>Website: ${element.website_url ? element.website_url : ''}</div>
      </div>
      `
    }
    else if(element.city === citySelectValue && element.brewery_type === typeSelectValue) {
      return `
        <div>
          <div>Name: ${element.name}</div>
          <div>Brewery Type: ${element.brewery_type}</div>
          <div>Street: ${element.street ? element.street : ''}</div>
          <div>Phone: ${element.phone ? element.phone : ''}</div>
          <div>Website: ${element.website_url ? element.website_url : ''}</div>
        </div>
      `
    }
  })
  if (event.target.tagName === 'BUTTON') {
    return `
    ${breweriesFilter}
    `
  } else {
    return `
    ${allBreweries}
    `
  }
}

fetchData();
