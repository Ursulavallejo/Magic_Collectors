//Update Info cities via PUT

let idCity = document.querySelector('#cityId')
let newName = document.querySelector('#newName')
let newPopulation = document.querySelector('#newPopulation')
let buttonPut = document.querySelector('#btnPut')
let putResultDiv = document.querySelector('#putResult')

buttonPut.addEventListener('click', () => {
  // Convert the population to a number:
  //parseFloat if decimals
  const populationValue = parseInt(newPopulation.value)

  // Check if the conversion was successful
  if (!isNaN(populationValue)) {
    fetch(`https://avancera.app/cities/${idCity.value}`, {
      body: JSON.stringify({
        name: newName.value,
        population: populationValue,
        id: idCity.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    }).then((response) => {
      if (response.status === 200) {
        putResultDiv.innerHTML = 'Successful!! Information Updated'

        // Clear input fields
        idCity.value = ''
        newName.value = ''
        newPopulation.value = ''
        console.log('put city', response)
      } else {
        putResultDiv.innerHTML = 'Error updating the city'
      }
    })
  } else {
    putResultDiv.innerHTML = 'Population must be a number'
  }
})
