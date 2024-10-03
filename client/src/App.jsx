import MainLayout from "./components/MainLayout"
import './App.css'
import PortalMap from "./components/PortalMap"
// import StarterMap from "./components/StarterMap"

function App() {

  return (
    <div className="container">
      <MainLayout>
      {/* <StarterMap/> */}
      <PortalMap />
      </MainLayout>
    </div>
  )
}

export default App
