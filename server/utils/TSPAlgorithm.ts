import { ILocation } from "../types";

export const TSP = (coordinates:ILocation[]) => {
  // Calculate the distances between the nodes
  const distances: number[][] = [];
  for (let i = 0; i < coordinates.length; i++) {
    distances[i] = [];
    for (let j = 0; j < coordinates.length; j++) {
      if (i === j) {
        distances[i][j] = 0;
        continue;
      }
      // Calculate the distance between two nodes using the haversine formula
      const lat1 = coordinates[i].lat;
      const lng1 = coordinates[i].lng;
      const lat2 = coordinates[j].lat;
      const lng2 = coordinates[j].lng;
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLng = ((lng2 - lng1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distances[i][j] = R * c;
    }
  }

  // Use Dijkstra's algorithm to find the shortest path between the nodes
  const sortedCoordinates: ILocation[] = [];
  const visited = new Set<number>();
  const startNode = 0;
  let currentNode = startNode;

  while (visited.size < coordinates.length) {
    sortedCoordinates.push(coordinates[currentNode]);
    visited.add(currentNode);
    let nextNode = -1;
    let minDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < coordinates.length; i++) {
      if (!visited.has(i) && distances[currentNode][i] < minDistance) {
        nextNode = i;
        minDistance = distances[currentNode][i];
      }
    }
    currentNode = nextNode;
  }
  return sortedCoordinates;
};

