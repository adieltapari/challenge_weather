import express from 'express';

// morgan is used to see the requests to the api when the server is running in the console
import morgan from 'morgan';
import routes from './routes';
import dotenv from 'dotenv';

import path from 'path';

// initializations
const app = express();
dotenv.config();

// settings
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));

// routes
app.get('/', (req, res) => {
  res.send(`Welcome to Challenge Weather`);
});

app.use(routes);

export default app;
