const btnLogOut = document.querySelector('#logOut')

btnLogOut.addEventListener('click', () => {
  // Clear localStorage
  localStorage.removeItem('userName')
  // localStorage.setItem('userName', null)

  // Redirect to the home page
  window.location.href = 'home.html'
})
