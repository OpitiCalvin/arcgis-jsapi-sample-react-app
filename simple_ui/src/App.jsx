import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from "@arcgis/core/widgets/LayerList"
import React, { useRef, useEffect, useState } from 'react'
import './App.css'
import { requestApplicationToken } from './utils/auth';

function App() {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);

  const showErrorMessage = (error) => {
    const app = document.getElementById("appDiv");
    if (app) {
      app.innerHTML = "<h3>Cannot create map view</h3> <p>Received error from the auth service:</p> <p>"+JSON.stringify(error) + "</p>";
    }
  }

  const setupMapView = () => {
    if (mapDiv.current){
      /**
       * Initialize the application
       */

      const webmap = new WebMap({
        portalItem: {
          id: "fb0a2396d6d146a09c2908a5fa253b3c",
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });

      setView(view);

      view.when(() => {
        console.log("view loaded");

        new LayerList({
          view,
          container: "layers-container"
        })
      })
    }
  }

  useEffect(() => {
    // geta token and render the map
    requestApplicationToken()
    .then(function(response) {
      setupMapView();
    }).catch(function(error){
      showErrorMessage(error)
    })
  }, [mapDiv]);
return (
  <div className='appDiv' ref={mapDiv}>
  </div>
)
}
export default App
