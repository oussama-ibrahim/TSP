import { LeafletEvent } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { ILocation } from "../types";
import {
  addLocation,
  deleteLocation,
  getLocations,
  updateLocation,
} from "../utils/mapEvent";
type Props = {
  markers: ILocation[];
  setMarkers: React.Dispatch<React.SetStateAction<ILocation[]>>;
};

const DraggableMarker = ({ markers, setMarkers }: Props) => {
  const markerRef = useRef(null);

  const fetchMapData = async () => {
    const currentLocation = await getLocations();
    setMarkers(currentLocation);
  };

  const eventHandlers = useMapEvents({
    click(event) {
      const add = async () => {
        await addLocation(event.latlng);
        await fetchMapData();
      };
      if (event.originalEvent.altKey) {
        add();
      }
    },
  });

  const updateMarker = async (event: LeafletEvent, key: string) => {
    await updateLocation(key, event.target._latlng);
    await fetchMapData();
  };

  const deleteMarker = async (key: string) => {
    await deleteLocation(key);
    await fetchMapData();
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  return (
    <>
      {markers.map((item: ILocation) => (
        <Marker
          draggable={true}
          position={item}
          ref={markerRef}
          key={item._id}
          eventHandlers={{
            dragend: (e) => {
              updateMarker(e, item._id);
            },
            dblclick: () => {
              deleteMarker(item._id);
            },
          }}
        ></Marker>
      ))}
    </>
  );
};
export default DraggableMarker;
