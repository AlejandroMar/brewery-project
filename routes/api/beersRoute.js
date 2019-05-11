const express = require('express');
const axios = require('axios');
const config = require('../../config/config.json');
// const chalk = require('chalk');
// const debug = require('debug')('server');

const router = express.Router();

const apiUrl = config.API_URL;
const apiKey = process.env.BEER_API_KEY;


router.get('/', async (req, res) => {
    const { page } = req.query;

    // request params
    const axiosParams = {
        params: {
            key: apiKey,
            p: page,
            withBreweries: 'Y',
        }
    };
    try {
        const listOfBeers = await axios.get(`https://sandbox-api.brewerydb.com/v2/beers/`, axiosParams);
        res.json(listOfBeers.data.data);
    } catch (error) {
        res.json(error.msg);
    }
});


module.exports = router;
