const divHero = document.querySelector('#hero')
const divHeader = document.createElement('div')
const divContainer = document.createElement('div')
const divForm = document.createElement('div')

// const divWelcome = document.createElement('div')
const h1Title = document.createElement('h1')
const pIntro = document.createElement('p')

// Classes/id to style
divHeader.classList.add('heroIntro')
divContainer.classList.add('container')

h1Title.textContent = 'Magic Collectors'
pIntro.textContent =
  'Magic The Gathering is our passion , if is also yours, you are welcome to access or site to find useful info regarding the Magic Cards'

divHero.appendChild(divHeader)
divHeader.appendChild(divContainer)
divContainer.appendChild(h1Title)
divContainer.appendChild(pIntro)
divContainer.appendChild(divForm)

function loadHomeUser() {
  let userName = JSON.parse(localStorage.getItem('userName'))

  if (userName !== null) {
    console.log('User is already stored:', userName)
    divForm.innerHTML = `
  <div id="greeting">
  <div class="containerWelcome">
  <h2 class="txtWelcome"> ${userName} you are already Logged In!</h2>
  <p>To continue with the cards : </p>
  <button class="btnLink"><a href="mainChartSwiper.html">CONTINUE</a></button>
  <p id="quoteText"> </p>

  </div>
  </div>
  `
  } else {
    // console.log('No user is stored.')
    divForm.innerHTML = `

  <form id="form">
  <fieldset>
  <label for="name" class="textLabel">Please let us know you :</label>
  <input id="name" type="text" placeholder="Write your Name" />
  <label for="consent">

    <input id="consent" type="checkbox" class="inline" />
    <span id="txtCheckbox">I accept the</span> <a href="#">terms and conditions</a>
  </label>
  <div id="errors" class="txtErrors" >
    <ul>
      <li id="name-error">Please provide a name to be able to acces</li>
      <li id="consent-error">Accept the agreement</li>
    </ul>
  </div>
  <input id="send" type="submit" value="Skicka" />
  </fieldset>
  </form>
  <div id="greeting"></div>
  `
  }
  divForm.classList.add('formAcces')
  handleInputs() // separate JS file
}

loadHomeUser()
