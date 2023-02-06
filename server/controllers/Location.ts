import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import config from '../config';
import { arrayToString, waypointsToLngLnt } from '../utils/arrayModifier';
import { ILocation, IWaypoint } from '../types';
import LocationRepo from '../db/repositories/Location';
import { Types } from 'mongoose';
import { TSP } from '../utils/TSPAlgorithm';

export const getSortedLocations: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const OSRM_URL = config.osrmUrl;
    const { algorithm } = req.query;
    const locations = await LocationRepo.find();
    let customResponse = {}

    if (algorithm === 'OSRM' && locations.length > 1) {
      const coordinates = arrayToString(locations);
      const response = await axios.get(`${OSRM_URL}/${coordinates}`);
      customResponse = waypointsToLngLnt(
        response?.data?.waypoints as IWaypoint[]
      );
    }
    else{
      customResponse= TSP(locations);
    }

    res.status(200).send({
      message: 'success',
      data: customResponse,
    });
  }
);

export const addLocation: RequestHandler = asyncHandler(async (req, res) => {
  const doc = await LocationRepo.create(req.body as ILocation);

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

export const deleteAllLocations: RequestHandler = asyncHandler(
  async (req, res) => {
    await LocationRepo.deleteAll();

    res.status(200).json({
      status: 'success',
      data: null,
    });
  }
);

export const deleteLocation: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const location = await LocationRepo.deleteOne(
      new Types.ObjectId(req.params.id)
    );

    if (!location) {
      return next(res.status(404).json({ status: 'failed' }));
    }

    res.status(200).json({
      status: 'success',
      data: null,
    });
  }
);

export const updateLocation: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const location = await LocationRepo.updateOne(
      new Types.ObjectId(req.params.id),
      req.body as ILocation
    );

    if (!location) {
      return next(res.status(404).json({ status: 'failed' }));
    }

    res.status(200).json({
      status: 'success',
      data: location,
    });
  }
);

export const getLocations: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const locations = await LocationRepo.find();

    res.status(200).send({
      message: 'success',
      data: locations,
    });
  }
);
