import React, { useEffect, useRef } from "react";

const MapPage = () => {
  const mapDiv = useRef(null);

  useEffect((_) => {
    let cleanup;
    // lazy load the module that loads the JSAPI
    // and initialize it
    import("../data/app").then(
      (app) => (cleanup = app.initialize(mapDiv.current))
    );
    return () => cleanup && cleanup();
  }, []);
  return <div className="mapDiv" ref={mapDiv}></div>;
};

export default MapPage;
