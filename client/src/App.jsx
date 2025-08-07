import MainLayout from "./components/MainLayout"
import './App.css'
// import MapFeatureLayer from "./components/MapFeatureLayer"
import PortalMap from "./components/PortalMap"
// import StarterMap from "./components/StarterMap"

function App() {

  return (
      <MainLayout>
      {/* <StarterMap/> */}
      <PortalMap />
      {/* <MapFeatureLayer /> */}
      </MainLayout>
  )
}

export default App
