require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const beersRouter = require('./routes/beersRoute');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev'));


const PORT = process.env.PORT || 4000;
app.use('/api/beers', beersRouter);

app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
