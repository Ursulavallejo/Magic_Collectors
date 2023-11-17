async function loadQuote() {
  let result = await axios.get('https://api.magicthegathering.io/v1/cards')
  const quoteRandom = document.querySelector('#quoteText')
  const spanQuote = document.createElement('span')

  spanQuote.classList.add('styleQuote')
  // dataAxios.push(result.data)
  let dataAxios = result.data.cards

  quote = dataAxios.filter((dataAxios) => dataAxios.flavor)

  for (let i = quote.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[quote[i], quote[j]] = [quote[j], quote[i]]
    // console.log(result.data.cards[i].name)
  }
  // console.log('quote', `${quote[0].flavor}`)

  spanQuote.innerHTML = `" ${quote[0].flavor} " <br> <span>${quote[0].name} </span> `

  quoteRandom.appendChild(spanQuote)
  // nameCardEntry.push(`${quote[0].flavor}`)
}

loadQuote()
