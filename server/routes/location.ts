import express from 'express';

import {
  addLocation,
  deleteAllLocations,
  deleteLocation,
  getLocations,
  getSortedLocations,
  updateLocation,
} from '../controllers/Location';

const router = express.Router();

router.post('/', addLocation);
router.get('/', getLocations);
router.get('/sorted', getSortedLocations);
router.delete('/', deleteAllLocations);
router.delete('/:id', deleteLocation);
router.patch('/:id', updateLocation);

export default router;
