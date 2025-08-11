import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from "@arcgis/core/widgets/LayerList"
import esriConfig from "@arcgis/core/config"
import { useRef, useEffect, useState } from 'react';
import { requestApplicationToken } from '../utils/auth';

const PortalMap = () => {
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
        esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL;
        const webmap = new WebMap({
          portalItem: {
            id: import.meta.env.VITE_WEBMAP_ID,
          },
        });
        
        const view = new MapView({
          container: mapDiv.current,
          map: webmap
        });

        const layerList = new LayerList({
          view: view,
          collapsed: true
        })

        setView(view);

        view.when(() => {
          console.log("view loaded");         
        });

        view.ui.add(layerList, {
          position: 'top-right'
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
      // setupMapView();
    }, [mapDiv]);
  return (
    <div className='mapDiv' ref={mapDiv}>
    </div>
  )
}

export default PortalMap;