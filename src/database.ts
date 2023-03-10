import mongoose from 'mongoose';
import config from './config/config';

mongoose.set('strictQuery', false);
mongoose.connect(config.DB.URI);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection start');
});
mongoose.set('strictQuery', true);

connection.on('error', err => {
  console.log(err);
  process.exit(0);
});
