
import { IWaypoint, ILocation } from '../types';

export const arrayToString = (locations: ILocation[]) => {
  const coordinates = locations
    .map((item) => `${item.lng},${item.lat}`)
    .join(';');
  return coordinates;
};

const sortWaypoints = (waypoints: IWaypoint[]) => {
  const sortedWaypoints = waypoints.sort(
    (a, b) => a.waypoint_index - b.waypoint_index
  );
  return sortedWaypoints;
};

export const waypointsToLngLnt =  (waypoints: IWaypoint[]) => {
  const sortedWaypoints = sortWaypoints(waypoints);
  const lngLnt = sortedWaypoints.map((item) => {
    
    return { lng: item.location[0], lat: item.location[1] };
  });
  return lngLnt;
};
