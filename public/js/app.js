const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

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
        messageTwo.textContent = `Current-Time is: ${data.forecast.currentTime}, Forecast was last updated on: ${data.forecast.lastUpdated}`
        messageThree.textContent = `Forecast: ${data.forecast.condition}, Current-Temperature: ${data.forecast.tempCurrent} degree celsius.\nFeels like: ${data.forecast.feelLike} degree celsius.`
        messageFour.textContent = `Max-Temperature: ${data.forecast.tempMax} degree celsius.\nMin-Temperature: ${data.forecast.tempMin} degree celsius.\nChances of rain: ${data.forecast.rainChance}%.\nHumidity: ${data.forecast.humidity}%.`
      }
    })
  })
})