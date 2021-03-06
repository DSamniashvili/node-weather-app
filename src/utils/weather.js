const request = require('request');
const APIKEY = '73a0fe13871371299092585383d19c03';

const weather = (coordinates, callback) => {
    const { lattitude, longtitude } = coordinates;
    request({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&&units=metric&exclude={minutely}&exclude={hourly}&exclude={minutely}&appid=${APIKEY}`,
        json: true
    }, (error, response) => {
        if (error) {
            callback('could not retireve data');
        } else if (response.body.cod && JSON.parse(response.body.cod) === 400) {
            callback(response.body.message);
        } else {
            const { temp, weather: [{ main, description }] } = response.body.current;
            callback(undefined, `Current temperature is: ${temp} degrees. Mainly: ${main}, ${description}`);
        }
    });
}

module.exports = weather;