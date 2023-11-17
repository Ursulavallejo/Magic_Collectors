/////// Handler

let divGreeting = document.getElementById('greeting')
let nameInput = document.getElementById('name')
let consentCheckbox = document.getElementById('consent')
let sendButton = document.getElementById('send')
let divElement = document.getElementById('errors')
let formElement = document.getElementById('form')

sendButton.disabled = true
divElement.style.display = 'none' // hide errors

function handleInputs() {
  let userName = nameInput.value
  let isConsented = consentCheckbox.checked

  if (userName === '') {
    document.getElementById('name-error').style.display = 'block' // Show name error
  } else {
    document.getElementById('name-error').style.display = 'none' // Hide name error
  }

  if (!isConsented) {
    document.getElementById('consent-error').style.display = 'block' // Show consent error
  } else {
    document.getElementById('consent-error').style.display = 'none' // Hide consent error
  }

  // Enable the button if both fields are true
  sendButton.disabled = !(userName !== '' && isConsented)

  // Hide or show the divElement
  if (userName === '' || !isConsented) {
    divElement.style.display = 'block' // Show div
  } else {
    divElement.style.display = 'none' // Hide div
  }
}

nameInput.addEventListener('input', handleInputs)
consentCheckbox.addEventListener('input', handleInputs)

formElement.addEventListener('submit', function (event) {
  event.preventDefault()

  document.getElementById('form').style.display = 'none' // Hide
  let userName = nameInput.value
  divGreeting.innerHTML = `
  <div class="containerWelcome">
  <h2 class="txtWelcome">Hi ${userName}!</h2>
  <p>We are really happy you visit our page. To be able to continue press the button!!</p>
  <button class="btnLink"><a href="mainChartSwiper.html">NEXT</a></button>
  </div>`
  localStorage.setItem('userName', JSON.stringify(userName))
  console.log(JSON.parse(localStorage.getItem('userName')))
})
