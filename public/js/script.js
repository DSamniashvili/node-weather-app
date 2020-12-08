const form = document.querySelector('form');
const inputVal = document.querySelector('#address');

let locationName = document.querySelector('.location-name');
let locationFullName = document.querySelector('.location-fullname');
let locationWeather = document.querySelector('.location-weather');


locationName.textContent = ''
locationFullName.textContent = '';
locationWeather.textContent = '';


form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (inputVal.value) {
        locationName.textContent = 'Loading...';
        fetch(`/weather?address=${inputVal.value}`).then((response) => {

            response.json().then((data) => {
                if (data.error) {
                    console.log('error: ', data.error);
                    locationName.textContent = data.error;
                } else {
                    locationName.textContent = `Provided location: ${data.address}`;
                    locationFullName.textContent = `Full location name: ${data.location}`;
                    locationWeather.textContent = `Current weather: ${data.weather}`;
                }
            })
        })
    } else {
        locationName.textContent = 'Please provide a location';
    }
})

// fetch('http://localhost:3000/weather?address=philadelphia').then((response) => {
//     response.json().then((data) => {
//         console.log('data', data);
//     })
// })
