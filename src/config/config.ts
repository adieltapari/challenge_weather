import * as dotenv from 'dotenv';
const result = dotenv.config();

if (result.error && process.env.URI_MONGO_DB === '') {
  console.log('Please set up a .env file with values. See README.md for more info.');
  process.exit(0);
}
export default {
  DB: {
    URI: process.env.URI_MONGO_DB || '',
  },
};
