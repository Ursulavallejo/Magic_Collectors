// In the Api CMC is realted with Mana Cost. On the code are related this names.

const ul = document.querySelector('#allCards')
const searchResultsDiv = document.querySelector('#searchResults')
const searchInput = document.querySelector('#searchInput')
const searchButton = document.querySelector('#searchButton')
const searchText = document.querySelector('.textSearch')
const toggleChartButton = document.querySelector('#toggleChartButton')
const myChartCanvas = document.querySelector('#chartContainer')

//Hide Chart / search text on load
myChartCanvas.style.display = 'block' // set to none if not are using Boostrap
searchText.style.display = 'none'

let chart = null

//Track Chart visibility
let chartVisible = false

//Remove data from search input when refresh page
document.querySelector('#searchInput').value = ''

//To fetch the data. For DRY we isolated it to be re-used:

let magicData = []

function fetchAndDisplayCards() {
  fetch('https://api.magicthegathering.io/v1/cards')
    .then((response) => response.json())
    .then((data) => {
      magicData = data
      displayRandomCards(data.cards)
      console.log(data.cards)
    })
}

// Fisher-Yates shuffle algorithm to randomize the array of cards
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function displayRandomCards(cards) {
  shuffleArray(cards)

  // Clear the previous list
  ul.innerHTML = ''

  // to send if to Chart.Js
  const labels = []
  const dataPower = []
  const dataToughness = []
  const dataCmc = []

  // Filter the cards that have a image first

  cards = cards.filter((card) => card.imageUrl)

  for (let n = 0; n < Math.min(12, cards.length); n++) {
    if (cards[n].imageUrl) {
      const li = document.createElement('li')
      const img = document.createElement('img')
      const pName = document.createElement('p')
      const span = document.createElement('span')
      const p = document.createElement('p')
      const p2 = document.createElement('p')
      const p3 = document.createElement('p')
      img.setAttribute('alt', 'cardImage')
      img.setAttribute('src', cards[n].imageUrl)

      // Classes to style
      li.classList.add('image-item') // slider
      li.classList.add('swiper-slide') // Swiper

      pName.classList.add('centered-card-list-item')
      p3.classList.add('powerCard')
      pName.classList.add('titleCard')
      p.classList.add('txtArtist')

      //To set Chart.JS labels:
      labels.push(cards[n].name)
      dataPower.push(cards[n].power)
      dataToughness.push(cards[n].toughness)
      dataCmc.push(cards[n].cmc)

      //To show the text after the image is loaded:

      img.onload = () => {
        pName.textContent = ` ${cards[n].name.toUpperCase()}`
        p.textContent = `Artist: ${cards[n].artist}`
        p2.innerHTML = `Type: ${cards[n].type} `
        span.innerHTML = `<br>Mana Cost: ${cards[n].cmc} `
        // Some cards dont have power/Toughness for not be showed when undefined:
        p3.textContent =
          cards[n].power !== undefined && cards[n].toughness !== undefined
            ? `Power: ${cards[n].power} Toughness: ${cards[n].toughness} `
            : ''

        li.appendChild(img)
        li.appendChild(pName)
        p2.appendChild(span)
        li.appendChild(p)
        li.appendChild(p2)

        li.appendChild(p3)
        ul.appendChild(li)
      }
    }
  }

  //Chart JS
  console.log('inside Cards:', cards)

  const ctx = document.getElementById('myChart').getContext('2d')

  if (chart === null) {
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# Power',
            data: dataPower,
            borderWidth: 1,
            // backgroundColor: ['#ABABAB'],
            //borderColor: ['#141414'],
          },
          {
            label: '# Thougness',
            data: dataToughness,
            borderWidth: 1,
            //backgroundColor: ['#FFFFF'],
            //borderColor: ['#141414'],
          },
          {
            label: '# Mana Cost',
            data: dataCmc,
            borderWidth: 1,
            //backgroundColor: ['#000000'],
            //borderColor: ['#141414'],
          },
        ],
      },
      options: {
        // To make it responsive
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 10, // Adjust the font size responsive
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 10, // Adjust the font size
              },
            },
          },
        },
      },
    })
  } else {
    console.log('clear chart')

    chart.data.labels = []
    chart.data.datasets = []

    chart.data.labels = labels
    chart.data.datasets[0] = {
      label: '# Power',
      data: dataPower,
      borderWidth: 1,
    }
    chart.data.datasets[1] = {
      label: '# Thougness',
      data: dataToughness,
      borderWidth: 1,
    }
    chart.data.datasets[2] = {
      label: '# Mana Cost ',
      data: dataCmc,
      borderWidth: 1,
    }

    chart.update()
  }
}

function displaySearchResults(filteredCards) {
  // Clear the previous search results
  searchResultsDiv.innerHTML = ''

  //Hide searchText
  searchText.style.display = 'none'

  // Filter out cards without images
  filteredCards = filteredCards.filter((card) => card.imageUrl)
  setTimeout(() => {
    if (filteredCards.length === 0) {
      searchResultsDiv.innerHTML =
        '<p class="searchMessage">No results found...Try again!</p>'
    } else {
      searchResultsDiv.classList.add('setStyle') // background search Text
      // Display a maximum of 3 results
      searchText.style.display = 'block'
      const maxResults = Math.min(3, filteredCards.length)
      for (let i = 0; i < maxResults; i++) {
        const card = filteredCards[i]
        const resultItem = document.createElement('div')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const pType = document.createElement('p')
        const pMana = document.createElement('p')

        img.setAttribute('alt', 'CardImage')
        img.setAttribute('src', card.imageUrl)

        // Classes to style
        resultItem.classList.add('cardItemSearch')
        h2.classList.add('titleCardSearch')
        pType.classList.add('txtType')
        pMana.classList.add('txtMana')

        h2.textContent = card.name.toUpperCase()

        pType.textContent = `Card Type: ${card.type} `
        pMana.textContent = `Mana Cost: ${card.cmc} `

        resultItem.appendChild(img)
        resultItem.appendChild(h2)
        resultItem.appendChild(pType)
        resultItem.appendChild(pMana)

        searchResultsDiv.appendChild(resultItem)
      }
    }

    // Hide loader animation
    document.querySelector('#loading').style.display = 'none'
  }, 1100)
}

function searchCards(cards, query) {
  const filteredCards = cards.filter((card) => {
    return card.name.toLowerCase().includes(query.toLowerCase())
  })
  displaySearchResults(filteredCards)
}

// Button To refresh the Cards
document.getElementById('refresh').addEventListener('click', () => {
  document.querySelector('.textSearch').style.display = 'none'
  fetchAndDisplayCards()
  // Clear the search input
  searchInput.value = ''
  // Clear the search results
  searchResultsDiv.innerHTML = ''
  searchResultsDiv.classList.remove('setStyle') // background searchtext
})

// Button To search the cards
searchButton.addEventListener('click', () => {
  const query = searchInput.value

  //show loader animation
  document.querySelector('#loading').style.display = 'block'
  searchResultsDiv.classList.remove('setStyle') // background searchtext

  if (query) {
    searchCards(magicData.cards, query)
  } else {
    searchText.style.display = 'none' // hide search text
    // Clear the search results
    searchResultsDiv.innerHTML = ''
    // Hide loader animation
    document.querySelector('#loading').style.display = 'none'
    // Show a message if no query is provided
    searchResultsDiv.innerHTML =
      '<p class="searchMessage">Please enter a search query and try again!</p>'
  }
  // Clear the search field
  searchInput.value = ''
})

// Initial loading
fetchAndDisplayCards()
