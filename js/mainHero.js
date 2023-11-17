//Hero >> Navigation >> Welcome user WEBSTORAGE

const hero = document.querySelector('#hero')

let userWelcome = JSON.parse(localStorage.getItem('userName'))

hero.innerHTML = `
<div class="containerBack">
<div class="heroContainer">
  <div class="userName">
    <h1 class="textName">Welcome ${userWelcome} !! </h1>
    <button id="logOut" class="btn btn-dark btn-md" type="button">LOGOUT</button>
  </div>
  <div class="logoMagic">
    <img
      src="assets/images/MTG_logo_white_e8c74ac8-b12f-4d5e-ad38-663ee7648021.webp"
      alt="logoMagic"
    />
  </div>
</div>
<img class="imgMenu" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-256.png" alt="MENU" id="hideshow" />
<nav id="navigation" class="stroke">
  <ul>
    <li class="view"><a href="#toggleChartButton">view chart cards</a></li>
    <li><a href="home.html">Home</a></li>
    <li><a href="cities.html">Cities</a></li>
    <li>
      <a href="https://github.com/Ursulavallejo" target="_blank">About</a>
    </li>



  </ul>
</nav>
</div>
`
