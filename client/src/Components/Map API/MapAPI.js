import "./map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function MapAPI({coordinates}) {
  return (
    <div className="App">
      <MapContainer
      center={[51.505, -0.09]} 
      zoom={0} 
      scrollWheelZoom={false}
      >

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {coordinates.map((c) => {
    return (
      <Marker 
    position={[c.latitude, c.longitude]}>
      <Popup>
        This is the location <br />
      </Popup>
    </Marker>
  );
})}
</MapContainer>
    </div>
  );
}

//add latitude and longitude from the address that the user will input in the addwalkform.js
