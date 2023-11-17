// Search City name (adapted Uppgift: En query-parameter):

let searchCityInput = document.querySelector('#searchCity')
let buttonSearch = document.querySelector('#btnSearch')
let searchResultDiv = document.querySelector('#searchResult')

buttonSearch.addEventListener('click', () => {
  const searchCity = searchCityInput.value

  fetch(`https://avancera.app/cities/?name=${searchCity}`)
    .then((response) => response.json())
    .then((cities) => {
      let resultSearch = ''

      if (cities.length === 0) {
        resultSearch = 'No matching cities found.'
      } else {
        for (let i = 0; i < cities.length; i++) {
          resultSearch += `${cities[i].name}. <br> Population :${cities[i].population} <br> City id: ${cities[i].id}<br>`
        }
      }
      // Update the content of the searchResult <div>
      searchResultDiv.innerHTML = resultSearch
      // Clear input fields
      searchCityInput.value = ''

      console.log('search: ', cities)
    })
})
