// POST: create a city / population

let name = document.querySelector('#postName')
let population = document.querySelector('#postPopulation')
let buttonPost = document.querySelector('#btnPost')
let postResultDiv = document.querySelector('#postResult')

buttonPost.addEventListener('click', () => {
  // Convert the population to a number:
  //parseFloat if decimals
  const populationValue = parseInt(population.value)

  // Check if the conversion was successful
  if (!isNaN(populationValue)) {
    fetch('https://avancera.app/cities/', {
      body: JSON.stringify({
        name: name.value,
        population: populationValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => {
      if (response.status === 201) {
        postResultDiv.innerHTML = 'Successful!! New city created'
        console.log('post city', response)
        // Clear input fields
        name.value = ''
        population.value = ''
      } else {
        postResultDiv.innerHTML = 'Error creating the city'
      }
    })
  } else {
    postResultDiv.innerHTML = 'Population must be a number'
  }
})
