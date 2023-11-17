// Update Info city or/and Population via PATCH

let idCityPatch = document.querySelector('#cityIdPatch')
let newNamePatch = document.querySelector('#newNamePatch')
let newPopulationPatch = document.querySelector('#newPopulationPatch')
let buttonPatch = document.querySelector('#btnPatch')
let patchResultDiv = document.querySelector('#patchResult')

buttonPatch.addEventListener('click', () => {
  const iDCity = idCityPatch.value // Get the city ID from the input
  const name = newNamePatch.value // Get the new name from the input
  const population = newPopulationPatch.value // Get the new population from the input

  // Check if either name or population is provided
  if (name || population) {
    const data = {
      name: name || undefined,
      population: population ? parseInt(population) : undefined,
    }

    fetch(`https://avancera.app/cities/${iDCity}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          patchResultDiv.innerHTML = 'Successful!! Information Updated'

          // Clear input fields
          idCityPatch.value = ''
          newNamePatch.value = ''
          newPopulationPatch.value = ''
        } else {
          patchResultDiv.innerHTML = 'Error updating the city / population'
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        patchResultDiv.innerHTML = 'Error updating the city / population'
      })
  }
})
