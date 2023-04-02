import React from "react";
import Dashboard from "./Component/Dashboard";
import SideNav from "./Component/SideNav";
export default function spotify() {
  return (
    <div className="d-flex flex-row container-fluid p-0 ">
      <SideNav />
      <Dashboard />
    </div>
  );
}
