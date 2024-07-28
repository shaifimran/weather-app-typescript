const app = require('./app.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// loading variables is config.env
dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('Database Connected...');
});

const port = Number(process.env.PORT) || 8000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

