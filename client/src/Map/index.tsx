import { LatLngExpression, Routing } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SideBar from "../sidebar";
import { ILocation } from "../types";
import { deleteAllLocations, getSortedLocations } from "../utils/mapEvent";
import DraggableMarker from "./DraggableMarker";
import RoutingMachine from "./Routing";

const Map: React.FC = () => {
  const location: LatLngExpression = [35.77438919386078, 10.827369689941408];
  const [data, setData] = useState<L.LatLng[]>([]);
  const [markers, setMarkers] = useState<ILocation[]>([]);
  const rMachine = useRef<Routing.Control>(null);

  const fetchMapData = async () => {
    const data = await getSortedLocations();
    setData(data);
    setMarkers([]);
  };
  const fetchMapDataOSRM = async () => {
    const data = await getSortedLocations('OSRM');
    setData(data);
    setMarkers([]);

  };
  const resetHandler = async () => {
    await deleteAllLocations();
    await fetchMapData();
    setMarkers([]);
  };

  useEffect(() => {
    if (rMachine.current) {
      rMachine.current.setWaypoints(data);
    }
  }, [data, rMachine]);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={location}
        zoom={15}
        style={{ width: "100%", height: "100vh" }}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          maxZoom={20}
        />
        <SideBar onClick={fetchMapData} onReset={resetHandler} onClickOSRM={fetchMapDataOSRM} />
        <DraggableMarker markers={markers} setMarkers={setMarkers} />
        <RoutingMachine ref={rMachine} waypoints={data as L.LatLng[]} />
      </MapContainer>
    </div>
  );
};

export default Map;
