import axios from "axios";
import { LatLng } from "leaflet";
import { ILocation } from "../types";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export const getLocations = async () => {
  try {
    const data = await axios
      .get(`${baseUrl}/api/v1/locations`)
      .then((res) => res.data.data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addLocation = async (location: LatLng) => {
  try {
    return await axios.post(`${baseUrl}/api/v1/locations`, location);
  } catch (err) {
    console.log(err);
  }
};

export const updateLocation = async (id: string, location: ILocation) => {
  try {
    await axios.patch(`${baseUrl}/api/v1/locations/${id}`, location);
  } catch (err) {
    console.log(err);
  }
};

export const deleteLocation = async (id: string) => {
  try {
    await axios.delete(`${baseUrl}/api/v1/locations/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllLocations = async () => {
  try {
    await axios.delete(`${baseUrl}/api/v1/locations`);
  } catch (err) {
    console.log(err);
  }
};

export const getSortedLocations = async (algorithm?: String) => {
  try {
    let query = algorithm ? "algorithm=OSRM" : "";

    const data = await axios
      .get(`${baseUrl}/api/v1/locations/sorted?${query}`)
      .then((res) => res.data.data);

    return data;
  } catch (err) {
    console.log(err);
  }
};
