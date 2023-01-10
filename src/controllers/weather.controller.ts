import { Request, Response } from 'express';
const axios = require('axios');
import Location from '../models/location';

//=====================================
//           CURRENT WATHER  = GET
//=====================================

export const current = async (req: Request, res: Response) => {
  const { city } = req.query;

  try {
    const respCity = await Location.findOne({ city }).select({ city: 1, lat: 1, lon: 1 });

    if (!respCity) {
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
        city: city,
        temp: main.temp,
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        humidity: main.humidity,
      });
    }

    // Instance City Current
    const instanceCurrent = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es',
        lat: respCity?.lat,
        lon: respCity?.lon,
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

    return res.status(200).json(respCity);
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error current',
    });
  }
};

//=====================================
//           CURRENT FORECAST  = GET
//=====================================

export const forecast = async (req: Request, res: Response) => {
  const { city } = req.query;

  try {
    const respcity = await Location.findOne({ city }).select({ city: 1, lat: 1, lon: 1 });

    if (!respcity) {
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
        day1: [list[0].temp, 'humedad:', list[0].humidity, 'desc', list[0].weather[0].description],
        day2: [list[1].temp, 'humedad:', list[1].humidity, 'desc', list[1].weather[0].description],
        day3: [list[2].temp, 'humedad:', list[2].humidity, 'desc', list[2].weather[0].description],
        day4: [list[3].temp, 'humedad:', list[3].humidity, 'desc', list[3].weather[0].description],
        day5: [list[4].temp, 'humedad:', list[4].humidity, 'desc', list[4].weather[0].description],
      });
    }
    // Forecast City
    const instanceForecast = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/forecast/daily`,
      params: {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es',
        cnt: 5,
        lat: respcity?.lat,
        lon: respcity?.lon,
      },
    });
    const respForecast = await instanceForecast.get();
    const { list } = respForecast.data;

    return res.status(200).json({
      Ciudad: city,
      day1: [list[0].temp, 'humedad:', list[0].humidity, 'desc', list[0].weather[0].description],
      day2: [list[1].temp, 'humedad:', list[1].humidity, 'desc', list[1].weather[0].description],
      day3: [list[2].temp, 'humedad:', list[2].humidity, 'desc', list[2].weather[0].description],
      day4: [list[3].temp, 'humedad:', list[3].humidity, 'desc', list[3].weather[0].description],
      day5: [list[4].temp, 'humedad:', list[4].humidity, 'desc', list[4].weather[0].description],
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error forecast',
    });
  }
};
