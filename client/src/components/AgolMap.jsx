import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from "@arcgis/core/widgets/LayerList"
import esriConfig from "@arcgis/core/config"
import { useRef, useEffect, useState } from 'react';
import { requestApplicationToken } from '../utils/auth';

const AgolMap = () => {
    const mapDiv = useRef(null);
    const [view, setView] = useState(null);

    const showErrorMessage = (error) => {
      const app = document.getElementById("mapDiv");
      if (app) {
        app.innerHTML = "<h3>Cannot create map view</h3> <p>Received error from the auth service:</p> <p>"+JSON.stringify(error) + "</p>";
      }
    }

    const setupMapView = () => {
      if (mapDiv.current) {
        esriConfig.portalUrl = import.meta.env.VITE_AGOL_URL;
        const webmap = new WebMap({
          portalItem: {
            id: import.meta.env.VITE_WEBMAP_ID,
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
          });
        });
      }
    }

    useEffect(() => {
      // setupMapView();
      // geta token and render the map
      requestApplicationToken()
      .then(function(response) {
        setupMapView();
      }).catch(function(error){
        showErrorMessage(error)
      })
    }, [mapDiv]);
  return (
    <div className='mapDiv' ref={mapDiv}>
    </div>
  )
}

export default AgolMap;