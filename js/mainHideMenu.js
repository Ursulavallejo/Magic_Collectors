function hidemenu() {
  var menu = document.getElementById('navigation')
  menu.classList.toggle('show')
}

var button = document.getElementById('hideshow')
button.addEventListener('click', hidemenu)
