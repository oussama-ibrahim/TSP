import React from "react";
import { SideBarProps } from "../types";

const SideBar = ({ onClick,onReset ,onClickOSRM}: SideBarProps) => {

  return (
    <div className="sideBar">
      <ul className="sidBar-btn">
        <li onClick={onClick}>fetch with TSP algorithm </li>
        <li onClick={onClickOSRM}>fetch with OSRM algorithm </li>
        <li onClick={onReset}> reset</li>
      </ul>
    </div>
  );
};

export default SideBar;
