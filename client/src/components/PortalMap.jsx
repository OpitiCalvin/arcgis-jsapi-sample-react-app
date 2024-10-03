import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from "@arcgis/core/widgets/LayerList"
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
        const webmap = new WebMap({
          portalItem: {
            id: "fb0a2396d6d146a09c2908a5fa253b3c",
          },
        });
        //  974c6641665a42bf8a57da08e607bb6f
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

export default PortalMap;