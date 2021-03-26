console.log("Client java script file is loaded!")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log('Your input location: ', location)

    messageOne.textContent = 'Loading data ...' 
    messageTwo.textContent = ''

    // myDataUrl = 'http://localhost:3000/weather?address=' + location

    // To use with heroku
    myDataUrl = '/weather?address=' + location
    fetch(myDataUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = 'Temperature:' + data.temp + '. And it feels like: ' + data.feelslike
            }
        })
    })
})