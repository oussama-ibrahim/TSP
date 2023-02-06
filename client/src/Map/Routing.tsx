import * as L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { RoutingMachineProps } from "../types";

const CreateRoutineMachineLayer = (props: RoutingMachineProps) => {
  const instance = L.Routing.control({
    waypoints: props?.waypoints?.map((item) => L.latLng(item?.lat, item?.lng)),
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: "blue", opacity: 0.7, weight: 5 }],
      extendToWaypoints: false,
      missingRouteTolerance: 10,
    },

  })

  return instance;
};

const RoutingMachine = createControlComponent(CreateRoutineMachineLayer);

export default RoutingMachine;
