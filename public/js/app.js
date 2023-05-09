const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        
      } else {
        messageOne.textContent = `Location: ${data.location}`
        messageTwo.innerHTML = `Current-Time is: ${data.forecast.currentTime}<br>Forecast was last updated on: ${data.forecast.lastUpdated}`
        messageThree.innerHTML = `Forecast:-<br>Weather-Condition: ${data.forecast.condition}.<br>Current-Temperature: ${data.forecast.tempCurrent} degree celsius.<br>Feels like: ${data.forecast.feelLike} degree celsius.<br>Max-Temperature: ${data.forecast.tempMax} degree celsius.<br>Min-Temperature: ${data.forecast.tempMin} degree celsius.<br>Chances of rain: ${data.forecast.rainChance}%.<br>Humidity: ${data.forecast.humidity}%.`
      }
    })
  })
})