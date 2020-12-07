const request = require('request');
const APIKEYFORMAPBOX = 'pk.eyJ1IjoiZGVhc2Ftbmlhc2h2aWxpIiwiYSI6ImNraTd1c2dkaDNlZGIyem1wYjA2ZXZsb2wifQ.PWr9W2h4QMja5ggyRyuflQ';


const geoCode = (address, callback) => {
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${APIKEYFORMAPBOX}&limit=1`,
        json: true
    }, (error, response) => {
        if (error) {
            callback('could not retireve data', undefined);
        } else if (!response.body.features || response.body.features.length === 0) {
            callback('could not find desired data', undefined);
        } else {
            callback(undefined,
                {
                    lattitude: response.body.features[0].center[1],
                    longtitude: response.body.features[0].center[0],
                    placeName: response.body.features[0].place_name,
                }
            )
        }
    });
}

module.exports = geoCode;