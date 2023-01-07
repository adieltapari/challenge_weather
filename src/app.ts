import express from 'express';
// morgan sirve para ver las peticiones a la api cuando esta corriendo el servidor en la consola
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
