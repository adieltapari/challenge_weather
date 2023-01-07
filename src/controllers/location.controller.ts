import { Request, Response } from 'express';
const axios = require('axios');
import Location, { ILocation } from '../models/location';

export const location = async (req: Request, res: Response) => {
  try {
    // Petición http
    const intance = axios.create({
      baseURL: `https://ipapi.co/json/`,
    });
    const resp = await intance.get();
    const { city, country, latitude, longitude } = resp.data;

    return res.status(200).json({
      city,
      country,
      latitude,
      longitude,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error location City',
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { city } = req.body;
  try {
    const locationCity = await Location.findOne({ city });
    if (locationCity) {
      return res.status(400).json({ status: 400, message: 'The Location already exist' });
    }

    const location = await Location.create(req.body);
    await location.save();

    res.status(200).json(location);
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: 'Error occurred in create location',
    });
  }
};

export const listCities = async (req: any, res: any) => {
  try {
    const city: ILocation[] = await Location.find().sort({
      city: 1,
    });

    res.status(200).json(city);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal error on services list cities',
    });
  }
};
