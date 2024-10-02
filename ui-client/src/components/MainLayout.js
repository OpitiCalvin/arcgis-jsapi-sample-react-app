import React, { Fragment } from "react";
import WebMapp from "./MapPage";
import { Header } from "./Header";

function MainLayout(props) {
  return (
    <Fragment>
      <Header />
      <MapPage />
      {props.children}
    </Fragment>
  );
}

export default MainLayout;
