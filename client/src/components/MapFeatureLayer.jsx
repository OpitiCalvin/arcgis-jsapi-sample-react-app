import React, { useEffect, useRef, useState } from 'react'
import esriConfig from "@arcgis/core/config"
import Map from "@arcgis/core/Map";
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import { requestApplicationToken } from '../utils/auth';

esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL;
esriConfig.request.trustedServers.push("https://testappb.opititechgeolabs.com");

const MapFeatureLayer = () => {
    const mapDiv = useRef(null)
    const [view, setView] = useState(null);

    const showErrorMessage = (error) => {
      const app = document.getElementById("mapDiv");
      if (app) {
        app.innerHTML = "<h3>Cannot create map view</h3> <p>Received error from the auth service:</p> <p>"+JSON.stringify(error) + "</p>";
      }
    }

    const setupMapView = () => {
        if (mapDiv.current) {
            // esriConfig.portalUrl = import.meta.env.VITE_PORTAL_URL;
            const map = new Map({
                basemap: "hybrid"
            })

            const view = new MapView({
                container: mapDiv.current,
                map: map
            })

            // add feature layer

            // const featureLayer = new FeatureLayer({
            //     url: "https://enterprisegis.opititechgeolabs.com/server/rest/services/Hosted/Scotland_Medical_Facilities_WFL1/FeatureServer/0"
            // });

            const featureLayer = new FeatureLayer({
                portalItem: {
                    id: "1d58d50f17ae4bdfa07331b162786870"
                }
            });
            
            featureLayer.load().then(() => {
              map.add(featureLayer)
            }, (error)=>{
              console.log(error.toString())
            })
            .catch((error) => {
              console.log(error.toString())
            });
            
            setView(view);

            view.when(() => {
                console.log("view loaded")
            })
        }
    }

    useEffect(() => {
        requestApplicationToken()
      .then(function(response) {
        console.log("get token resp", response)
        setupMapView();
      }).catch(function(error){
        showErrorMessage(error)
      })
    }, [mapDiv])
  return (
    <div className='mapDiv' ref={mapDiv}>
    </div>
  )
}

export default MapFeatureLayer