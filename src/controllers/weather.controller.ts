import { Request, Response } from 'express';
const axios = require('axios');

export const current = async (req: Request, res: Response) => {
  try {
    // Petición http
    const instanceipapi = axios.create({
      baseURL: `https://ipapi.co/json/`,
    });
    const resp = await instanceipapi.get();
    const { latitude, longitude } = resp.data;

    const instance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es',
        lat: latitude,
        lon: longitude,
      },
    });
    const respweather = await instance.get();

    const { weather, main } = respweather.data;
    return res.status(200).json({
      desc: weather[0].description,
      min: main.temp_min,
      max: main.temp_max,
      temp: main.temp,
      humedad: main.humidity,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error current',
    });
  }
};
