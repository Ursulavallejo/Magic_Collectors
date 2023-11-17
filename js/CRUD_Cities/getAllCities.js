//Get All Cities
function getAllCities() {
  fetch('https://avancera.app/cities/')
    .then((response) => response.json())
    .then((result) => {
      let div = document.querySelector('#cities')
      let divInfo = document.querySelector('#citiesInfo')
      div.innerHTML = ''
      divInfo.innerHTML = ''
      console.log('ID', result)

      for (let i = 0; i < result.length; i++) {
        const cityDiv = document.createElement('div')
        const cityInfo = document.createElement('div')
        const h3 = document.createElement('h3')
        const pPopulation = document.createElement('p')
        const pId = document.createElement('p')
        cityDiv.setAttribute('id', result[i].id)
        cityInfo.setAttribute('id', result[i].id)

        h3.textContent = ` ${result[i].name.toUpperCase()}`
        pPopulation.textContent = ` (Population: ${result[i].population}) `

        cityDiv.appendChild(h3)
        cityInfo.appendChild(pPopulation)
        cityInfo.appendChild(pId)
        div.appendChild(cityDiv)
        divInfo.appendChild(cityInfo)
      }
    })
}

getAllCities()

document.querySelector('#updateButton').addEventListener('click', () => {
  console.log('updating info...')
  getAllCities()
})
