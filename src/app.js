const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/weather');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const templatesDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatesDirPath);
hbs.registerPartials(partialsDirPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        createdBy: 'Dea Samniashvili',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Address must be provided');
    }

    const { address } = req.query;

    geoCode(address, (error, data) => {
        if (error) {
            return res.send({ error });
        }

        if (data) {
            weather(data, (error, dataWeather) => {
                if (error) {
                    return res.send({ error });
                }

                if (dataWeather) {
                    res.send({
                        weather: dataWeather,
                        address,
                        location: data.placeName,
                    });

                }
            })
        }
    });
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        textContent: 'This page contains info about the current app',
        createdBy: 'Dea Samniashvili',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        textContent: 'This page is to provide contact information.',
        createdBy: 'Dea Samniashvili',
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        errorMessage: 'No content',
        createdBy: 'Dea Samniashvili',
    });
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help not found',
        errorMessage: 'No content',
        createdBy: 'Dea Samniashvili',
    });
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Mostly sunny',
        location: 'Africa',
    });
})

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
})