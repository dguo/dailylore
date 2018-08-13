/* eslint-env node */
/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import {getSourcesWithArticles} from './newsapi';

dotenv.config();

const {MOCK_HEADLINES, NEWS_API_KEY} = process.env;

const HEADLINES_FILE = path.resolve(__dirname, '../site/headlines.json');
const MOCK_HEADLINES_FILE = path.resolve(
    __dirname,
    '../site/mock-headlines.json'
);

if (!NEWS_API_KEY) {
    if (MOCK_HEADLINES === '1') {
        fs.copyFileSync(MOCK_HEADLINES_FILE, HEADLINES_FILE);
    } else {
        console.error('The NEWS_API_KEY environment variable is not set.');
        console.error('Use template.env to Create a .env file.');
        console.error('You can also set MOCK_HEADLINES to 1 to use mock data.');
        process.exit(1);
    }
} else {
    getSourcesWithArticles(NEWS_API_KEY).then(headlines => {
        fs.writeFileSync(HEADLINES_FILE, JSON.stringify(headlines));
    });
}
