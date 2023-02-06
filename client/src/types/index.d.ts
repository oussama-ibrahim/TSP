import { LatLng } from "leaflet";
import SideBar from "../sidebar";

export interface ILocation extends LatLng {
  _id: string;
}

export interface SideBarProps {
  onClick: React.MouseEventHandler;
  onClickOSRM: React.MouseEventHandler;
  onReset: React.MouseEventHandler;
}

interface RoutingMachineProps extends L.ControlOptions {
   waypoints: L.LatLng[];
 }