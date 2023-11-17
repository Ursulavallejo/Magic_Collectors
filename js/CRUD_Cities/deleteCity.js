// DELETE: delete city and population

let idCityDelete = document.querySelector('#deleteCity')
let buttonDelete = document.querySelector('#btnDelete')
let deleteResultDiv = document.querySelector('#deleteResult')

buttonDelete.addEventListener('click', () => {
  fetch(`https://avancera.app/cities/${idCityDelete.value}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.status === 200) {
      deleteResultDiv.innerHTML = 'Successful!! Information deleted'
      // Clear input fields
      idCityDelete.value = ''
      console.log('delete city', response)
    } else {
      deleteResultDiv.innerHTML = 'Error deleting the city'
    }
  })
})
