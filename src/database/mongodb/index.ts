/* eslint-disable no-console */

import chalk from 'chalk';
import mongoose from 'mongoose';

import config from '../../config';

const createConnection = (): void => {
    mongoose.connect(config.mongodb.connection);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => console.log(` Connected to Database: ${chalk.blue('Mongodb')} \n`));
};

export default createConnection;
