const form = document.querySelector('form');
const inputVal = document.querySelector('#address');

let locationName = document.querySelector('.location-name');
let locationFullName = document.querySelector('.location-fullname');
let locationWeather = document.querySelector('.location-weather');




form.addEventListener('submit', (event) => {
    event.preventDefault();

    locationName.textContent = ''
    locationFullName.textContent = '';
    locationWeather.textContent = '';

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

                    inputVal.value = '';
                }
            })
        })
    } else {
        locationName.textContent = 'Please provide a location';
    }
});