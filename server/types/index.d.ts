export interface ILocation {
    lng:number
    lat:number
   
} 

export interface IWaypoint {
  waypoint_index: number;
  trips_index: number;
  hint: string;
  distance: string;
  name: string;
  location:number[];
}
