import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import LayerList from "@arcgis/core/widgets/LayerList"
import { useRef, useEffect, useState } from 'react'

const StarterMap = () => {
    const mapDiv = useRef(null);
    const [view, setView] = useState(null);

    useEffect(() => {
      if (mapDiv.current){
        /**
         * Initialize the application
         */

        const webmap = new WebMap({
          portalItem: {
            id: "974c6641665a42bf8a57da08e607bb6f",
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
    }, [mapDiv]);
  return (
    <div className='mapDiv' ref={mapDiv}>
    </div>
  )
}

export default StarterMap