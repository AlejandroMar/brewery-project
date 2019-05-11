const express = require('express');
const axios = require('axios');
// const chalk = require('chalk');
// const debug = require('debug')('server');

const router = express.Router();

const apiUrl = process.env.BEER_URL;
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
        const listOfBeers = await axios.get(`${apiUrl}beers/`, axiosParams);
        res.json(listOfBeers.data.data);
    } catch (error) {
        res.json(error.msg);
    }
});


module.exports = router;
