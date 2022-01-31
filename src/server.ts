import chalk from 'chalk';

import config from './config';
import { createApp } from './app';

const app = createApp();

app.listen(config.port, () =>
    console.log(`\n API: ${chalk.blue('Financial Targets - Accounts API')}
 Running on port: ${chalk.blue(config.port)}
 Environment: ${chalk.blue(config.environment)}`)
);
