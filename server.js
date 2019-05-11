require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const beersRouter = require('./routes/beersRoute');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev'));

app.use('/api/beers', beersRouter);

if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
