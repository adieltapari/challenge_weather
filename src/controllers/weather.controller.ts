import { Request, Response } from 'express';
const axios = require('axios');

export const current = async (req: Request, res: Response) => {
  try {
    // Instance  Ipapi
    const instanceIpapi = axios.create({
      baseURL: `https://ipapi.co/json/`,
    });
    const resp = await instanceIpapi.get();
    const { latitude, longitude, city } = resp.data;

    // Instance  Current Weather
    const instanceCurrent = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es',
        lat: latitude,
        lon: longitude,
      },
    });

    const respCurrent = await instanceCurrent.get();
    const { weather, main } = respCurrent.data;
    return res.status(200).json({
      Ciudad: city,
      temp: main.temp,
      desc: weather[0].description,
      min: main.temp_min,
      max: main.temp_max,
      humedad: main.humidity,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error current',
    });
  }
};

export const forecast = async (req: Request, res: Response) => {
  try {
    // Instance  Ipapi
    const instanceIpapi = axios.create({
      baseURL: `https://ipapi.co/json/`,
    });
    const resp = await instanceIpapi.get();
    const { latitude, longitude, city } = resp.data;

    // Instance  Forecast Weather
    const instanceForecast = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/forecast/daily`,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es',
        cnt: 5,
        lat: latitude,
        lon: longitude,
      },
    });
    const respForecast = await instanceForecast.get();
    const { list } = respForecast.data;

    return res.status(200).json({
      Ciudad: city,
      day1: list[0],
      day2: list[1],
      day3: list[2],
      day4: list[3],
      day5: list[4],
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error forecast',
    });
  }
};