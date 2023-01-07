import { Request, Response } from 'express';
const axios = require('axios');

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
